import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";

// TextOverlay Component
const TextOverlay = () => {
    const dispatch = useDispatch();

    const activeViewer = useSelector((state) =>
        state.viewer.activeId
            ? state.viewer.collections[state.viewer.activeId]
            : null
    );

    if (!activeViewer) return null;

    return (
        <div className="p-6">
            <h2 className="text-white font-semibold mb-4">Text</h2>

            <Input
                value={activeViewer.textContent}
                onChange={(e) =>
                    dispatch.viewer.setTextContent({
                        id: activeViewer.key,
                        text: e.target.value,
                    })
                }
                className="bg-zinc-800 border-zinc-700 text-white"
            />
        </div>
    );
};

export default TextOverlay;