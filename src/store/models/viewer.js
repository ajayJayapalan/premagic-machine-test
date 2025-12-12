export const viewer = {
    state: {
        collections: {},        // { [viewerId]: viewerState }
        allIds: [],      // [viewerId]
        activeId: null,  // current active viewer
    },

    reducers: {
        addViewer(state, payload) {
            const { id } = payload;

            // prevent duplicates
            if (state.collections[id]) return state;

            const nextAllIds = [...state.allIds, id];

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [id]: {
                        ...createViewerState(),
                        key: id,
                    },
                },
                allIds: nextAllIds,
                activeId: state.activeId ?? id, // first viewer becomes active
            };
        },

        removeViewer(state, id) {
            if (!state.collections[id]) return state;

            const { [id]: removed, ...restcollections } = state.collections;
            const nextAllIds = state.allIds.filter(vId => vId !== id);

            return {
                ...state,
                collections: restcollections,
                allIds: nextAllIds,
                activeId:
                    state.activeId === id
                        ? nextAllIds[0] ?? null
                        : state.activeId,
            };
        },

        setActiveViewer(state, id) {
            if (!state.collections[id]) return state;

            return {
                ...state,
                activeId: id,
            };
        },

        setImage(state, { id, imageUrl, imageName }) {
            const viewer = state.collections[id];
            if (!viewer) return state;

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [id]: {
                        ...viewer,
                        imageUrl,
                        imageName,
                    },
                },
            };
        },

        updateFilter(state, { id, filter, value }) {
            const viewer = state.collections[id];
            if (!viewer) return state;

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [id]: {
                        ...viewer,
                        filters: {
                            ...viewer.filters,
                            [filter]: value,
                        },
                    },
                },
            };
        },

        resetFilters(state, id) {
            const viewer = state.collections[id];
            if (!viewer) return state;

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [id]: {
                        ...viewer,
                        filters: createViewerState().filters,
                    },
                },
            };
        },

        setTextContent(state, { id, text }) {
            const viewer = state.collections[id];
            if (!viewer) return state;

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [id]: {
                        ...viewer,
                        textContent: text,
                    },
                },
            };
        },
    },
};

function createViewerState() {
    return {
        key: null,

        imageUrl: "",
        imageName: "",

        filters: {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            sepia: 0,
            blackWhite: 0,
        },

        textContent: "",
    };
}
