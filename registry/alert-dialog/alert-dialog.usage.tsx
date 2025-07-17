import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Text } from "react-native";

export default function AlertDialogExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);

    return (
        <AlertDialog open={basicOpen} onOpenChange={setBasicOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Text className="text-foreground">Show Alert</Text>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Please confirm that you want
                        to proceed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <Button variant="outline">
                            <Text className="text-foreground">Cancel</Text>
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction>
                        <Button>
                            <Text className="text-primary-foreground">Continue</Text>
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
