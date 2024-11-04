import { useForm, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/select";
import { Input } from "@/component/Input";
import { Button } from "@/component/Button";

type FilterFormValues = {
    selectedFilter: string;
    filterValue: string;
};

export default function Filter({ onFilterChange }: { onFilterChange: (query: string) => void }) {
    const { handleSubmit, control, watch, setValue } = useForm<FilterFormValues>({
        defaultValues: {
            selectedFilter: '',
            filterValue: '',
        },
    });

    const selectedFilter = watch("selectedFilter");

    const onSubmit = (data: FilterFormValues) => {
        let queryStr;
        if (data.selectedFilter === 'difficulty') queryStr = `${data.selectedFilter}=${data.filterValue}`;
        else queryStr = `${data.selectedFilter}[lte]=${data.filterValue}`;
        onFilterChange(queryStr);
    };

    const renderValueInput = () => {
        if (selectedFilter === 'difficulty') {
            return (
                <Controller
                    name="filterValue"
                    control={control}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="difficult">Difficult</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            );
        } else {
            return (
                <Controller
                    name="filterValue"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            placeholder={`Enter ${selectedFilter}`}
                            className="w-full"
                        />
                    )}
                />
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4">
            <div className="flex flex-wrap items-end gap-4">
                <div className="w-full sm:w-64">
                    <Controller
                        name="selectedFilter"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setValue("filterValue", ""); // Reset filterValue when selectedFilter changes
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="maxGroupSize">Max Group Size</SelectItem>
                                    <SelectItem value="ratingsAverage">Max Ratings Average</SelectItem>
                                    <SelectItem value="price">Max Price</SelectItem>
                                    <SelectItem value="difficulty">Difficulty</SelectItem>
                                    <SelectItem value="duration">Max Duration</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="w-full sm:w-64">
                    {renderValueInput()}
                </div>

                <Button type="submit" className="w-full bg-zinc-700 sm:w-auto">Apply Filter</Button>
            </div>
        </form>
    );
}
