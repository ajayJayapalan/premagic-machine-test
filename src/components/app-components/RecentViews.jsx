import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";

// RecentViews Component
const RecentViews = () => {
    const dispatch = useDispatch();

    const { allIds, collections, activeId } = useSelector(
        (state) => state.viewer
    );

    return (
        <div className="mt-6">
            <h3 className="text-white text-sm font-medium mb-3">
                Recent images
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {allIds.map((id) => {
                    const viewer = collections[id];

                    return (
                        <div key={id} className="flex flex-col gap-2">
                            <Card
                                onClick={() =>
                                    dispatch.viewer.setActiveViewer(id)
                                }
                                className={`aspect-video bg-zinc-800 border-zinc-700 flex items-center justify-center cursor-pointer
                  ${activeId === id ? "ring-2 ring-indigo-500" : ""}`}
                            >
                                {viewer.imageUrl && (
                                    <img
                                        src={viewer.imageUrl}
                                        alt={viewer.imageName}
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </Card>

                            <span className="text-zinc-400 text-sm">
                                {viewer.imageName || "Untitled"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentViews;