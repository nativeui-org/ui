import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function AvatarExample() {
    return (
        <Avatar>
            <AvatarImage
                source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                alt="Profile picture"
            />
            <AvatarFallback>TR</AvatarFallback>
        </Avatar>
    );
} 