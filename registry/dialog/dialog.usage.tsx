import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { Text, View } from "react-native";

export default function DialogExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);

    return (
        <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-auto">
                    <Text className="text-foreground">Open Dialog</Text>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Basic Dialog</DialogTitle>
                    <DialogDescription>
                        This is a basic dialog example with a title and
                        description.
                    </DialogDescription>
                </DialogHeader>
                <View className="p-6 pt-0">
                    <Text className="text-foreground">
                        Dialogs are used to show important information that
                        requires user attention or interaction.
                    </Text>
                </View>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">
                            <Text>Close</Text>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
