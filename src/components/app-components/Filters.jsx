
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

// Filters Component
const Filters = () => {
    const dispatch = useDispatch();

    const activeViewer = useSelector((state) =>
        state.viewer.activeId
            ? state.viewer.collections[state.viewer.activeId]
            : null
    );

    if (!activeViewer) return null;

    const { filters, key } = activeViewer;

    const controls = [
        { label: "Brightness", key: "brightness" },
        { label: "Saturation", key: "saturation" },
        { label: "Contrast", key: "contrast" },
        { label: "Sepia", key: "sepia" },
        { label: "Black/white", key: "blackWhite" },
    ];

    return (
        <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold">Filters</h2>

                <Button
                    variant="ghost"
                    className="text-indigo-400"
                    onClick={() => dispatch.viewer.resetFilters(key)}
                >
                    Reset
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {controls.map((f) => (
                    <div key={f.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-zinc-400 text-sm">
                                {f.label}
                            </label>
                            <span className="text-white text-sm">
                                {filters[f.key]}%
                            </span>
                        </div>

                        <Slider
                            value={[filters[f.key]]}
                            max={200}
                            step={1}
                            onValueChange={([value]) =>
                                dispatch.viewer.updateFilter({
                                    id: key,
                                    filter: f.key,
                                    value,
                                })
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;