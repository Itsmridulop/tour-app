import React from "react";
import { UserDataType } from "../../types/userType";

interface GuideSectionProps {
    guides?: UserDataType[];
    renderGuide: (guide: UserDataType) => React.ReactNode;
}

const Guides: React.FC<GuideSectionProps> = ({ guides, renderGuide }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Tour Guide</h2>
            <div className="flex items-center space-x-4 mt-4">
                {(guides && typeof guides[0] === 'string') ? (
                    renderGuide(guides[0])
                ) : (
                    <p className="text-sm text-gray-500">No guide information available.</p>
                )}
            </div>
        </div>
    )
}

export default Guides
