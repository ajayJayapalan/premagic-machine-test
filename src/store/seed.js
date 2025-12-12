export function seedViewers(dispatch) {
    const viewers = [
        {
            id: "viewer-1",
            imageUrl:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            imageName: "Mountain Lake",
            textContent: "Nature vibes",
        },
        {
            id: "viewer-2",
            imageUrl:
                "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
            imageName: "Running Shoes",
            textContent: "Stay active",
        },
        {
            id: "viewer-3",
            imageUrl:
                "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80",
            imageName: "City Night",
            textContent: "Urban energy",
        },
    ];

    viewers.forEach((viewer) => {
        dispatch.viewer.addViewer({ id: viewer.id });

        dispatch.viewer.setImage({
            id: viewer.id,
            imageUrl: viewer.imageUrl,
            imageName: viewer.imageName,
        });

        dispatch.viewer.setTextContent({
            id: viewer.id,
            text: viewer.textContent,
        });
    });

    // explicitly set first viewer as active (safe & predictable)
    dispatch.viewer.setActiveViewer(viewers[0].id);
}
