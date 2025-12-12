import React, { useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCw, X } from 'lucide-react';
import "./App.css"
import { useDispatch, useSelector } from 'react-redux';
import { seedViewers } from './store/seed';

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


// Viewer Component (combines ActiveViewer and RecentViews)
const Viewer = () => {
  return (
    <div className="flex-1 p-6 flex flex-col overflow-y-auto">
      <ActiveViewer />
      <RecentViews />
    </div>
  );
};

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


// Editor Component (combines Filters and TextOverlay)
const Editor = () => {
  return (
    <div className="w-96 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      <Filters />
      <TextOverlay />
    </div>
  );
};

// Main App Component
const App = () => {
  const dispatch = useDispatch();
  const viewer = useSelector((state) => state.viewer);

  console.log({ viewer })

  useEffect(() => {
    seedViewers(dispatch);
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-950 flex overflow-hidden">
      <Viewer />
      <Editor />
    </div>
  );
};



export default App;