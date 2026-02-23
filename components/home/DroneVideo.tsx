
export function DroneVideo() {
    return (
        <section className="relative h-[100vh] w-full overflow-hidden bg-void-black">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
            >
                <source src="/DJI_0062.MOV" type="video/mp4" />
                <source src="/DJI_0062.MOV" type="video/quicktime" />
            </video>
            {/* Optional overlay for better integration with dark theme if needed */}
             <div className="absolute inset-0 bg-black/10" /> 
        </section>
    );
}
