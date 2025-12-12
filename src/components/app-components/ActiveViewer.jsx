import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

// ActiveViewer Component
const ActiveViewer = () => {
    const dispatch = useDispatch();

    const activeViewer = useSelector((state) =>
        state.viewer.activeId
            ? state.viewer.collections[state.viewer.activeId]
            : null
    );

    if (!activeViewer) return null;

    const { imageUrl, imageName, textContent, filters } = activeViewer;

    const cssFilter = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturation}%)
    sepia(${filters.sepia}%)
    grayscale(${filters.blackWhite}%)
  `;

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Input
                    value={imageName}
                    onChange={(e) =>
                        dispatch.viewer.setImage({
                            id: activeViewer.key,
                            imageUrl,
                            imageName: e.target.value,
                        })
                    }
                    className="flex-1 bg-zinc-800 border-zinc-700 text-white"
                />
            </div>

            <Card className="flex-1 bg-zinc-900 border-zinc-800 flex items-center justify-center relative overflow-hidden">
                {textContent && (
                    <div
                        className="absolute top-10 left-1/2 -translate-x-1/2
               text-black text-xl font-extrabold z-10"
                        style={{
                            textShadow: `
        -1px -1px 0 #fff,
         1px -1px 0 #fff,
        -1px  1px 0 #fff,
         1px  1px 0 #fff
      `,
                        }}
                    >
                        {textContent}
                    </div>
                )}


                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={imageName}
                        className="max-h-[50vh] max-w-full object-contain"
                        style={{ filter: cssFilter }}
                    />
                ) : (
                    <div className="w-64 h-64 bg-zinc-800 rounded-lg flex items-center justify-center">
                        {/* placeholder */}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ActiveViewer;