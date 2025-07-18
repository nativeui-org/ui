import { Slider } from "@/components/ui/slider";
import * as React from "react";

export default function SliderExample() {
    const [volume, setVolume] = React.useState([50]);

    return (
        <Slider
            value={volume}
            onValueChange={setVolume}
            className="mt-2"
        />
    );
}
