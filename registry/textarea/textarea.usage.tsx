import { TextArea } from "@/components/ui/textarea";
import * as React from "react";

export default function TextAreaExample() {

    return (
        <TextArea
            placeholder="Type your message here..."
            numberOfLines={4}
        />
    );
}
