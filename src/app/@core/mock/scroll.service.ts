import { Overlay, RepositionScrollStrategy } from "@angular/cdk/overlay";

export function scrollFactory(overlay: Overlay): () => RepositionScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}