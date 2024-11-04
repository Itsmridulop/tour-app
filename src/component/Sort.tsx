import { useSearchParams } from "react-router-dom";

interface SortOption {
    label: string;
    value: string;
}

interface SortByProps {
    options: SortOption[];
}

const SortBy: React.FC<SortByProps> = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsObj = {
        filter: searchParams.get("filter") || "",
        sortBy: searchParams.get("sortBy") || "",
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ ...searchParamsObj, sortBy: e.target.value, page: "1" });
    };

    return (
        <select
            onChange={handleChange}
            className="border border-gray-200 bg-gray-50 rounded-md p-2 text-gray-800"
            defaultValue={searchParams.get("sortBy") || ""}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SortBy;
