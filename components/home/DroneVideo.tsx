
export function DroneVideo() {
    return (
        <section className="relative h-[100vh] w-full overflow-hidden bg-void-black pointer-events-none">
            {/* We scale the container up slightly and shift it so the YouTube UI (which always lives at the edges) gets cropped completely out of the viewport */}
            <div className="absolute top-1/2 left-1/2 w-[110vw] h-[61.875vw] min-h-[110vh] min-w-[195.55vh] -translate-x-1/2 -translate-y-1/2">
                <iframe
                    className="absolute top-0 left-0 w-full h-full scale-[1.05]"
                    src="https://www.youtube.com/embed/gIvk53PqZ2A?autoplay=1&mute=1&loop=1&playlist=gIvk53PqZ2A&controls=0&rel=0&iv_load_policy=3&modestbranding=1"
                    title="Contreras Steel Background Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ border: 0 }}
                />
            </div>
            {/* Optional overlay for better integration with dark theme if needed */}
            <div className="absolute inset-0 bg-black/10" />
        </section>
    );
}
