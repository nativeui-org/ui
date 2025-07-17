import { ComponentPreview } from "@/components/docs/component-preview";

export default function AvatarPage() {
  return (
    <ComponentPreview
      name="Avatar"
      description="A avatar component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Avatar } from \"@nativeui/ui\";\n\nexport default function AvatarDemo() {\n  return (\n    <Avatar>\n      Click me\n    </Avatar>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  Image,
  View,
  Text,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { cn } from "@/lib/utils";

interface AvatarRootProps {
  className?: string;
  children: React.ReactNode;
}

const AvatarRoot = React.forwardRef<View, AvatarRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

interface AvatarImageProps {
  className?: string;
  source: ImageSourcePropType;
  alt?: string;
  style?: ImageStyle;
  onLoad?: () => void;
  onError?: () => void;
}

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ className, source, alt, ...props }, ref) => {
    const imageContext = React.useContext(AvatarContext);

    const handleError = () => {
      imageContext?.setHasError(true);
      props.onError?.();
    };

    const handleLoad = () => {
      imageContext?.setImageLoaded(true);
      props.onLoad?.();
    };

    return (
      <Image
        ref={ref}
        source={source}
        accessibilityLabel={alt}
        className={cn("h-full w-full object-cover", className)}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    );
  }
);

interface AvatarFallbackProps {
  className?: string;
  children: React.ReactNode;
  delayMs?: number;
}

interface AvatarContextValue {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ className, children, delayMs = 600, ...props }, ref) => {
    const [isShowing, setIsShowing] = React.useState(delayMs === 0);
    const avatarContext = React.useContext(AvatarContext);

    React.useEffect(() => {
      if (delayMs === 0) return;

      // Only show fallback if image has error or hasn't loaded after delay
      const timer = setTimeout(() => {
        if (!avatarContext?.imageLoaded) {
          setIsShowing(true);
        }
      }, delayMs);

      return () => clearTimeout(timer);
    }, [delayMs, avatarContext?.imageLoaded]);

    // Hide fallback if image loads successfully
    React.useEffect(() => {
      if (avatarContext?.imageLoaded) {
        setIsShowing(false);
      }
    }, [avatarContext?.imageLoaded]);

    if (!isShowing || avatarContext?.imageLoaded) {
      return null;
    }

    return (
      <View
        ref={ref}
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center bg-muted",
          className
        )}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className="text-base font-medium text-muted-foreground">
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

// Wrap the original AvatarRoot to provide context
const Avatar = React.forwardRef<View, AvatarRootProps>((props, ref) => {
  const [hasError, setHasError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <AvatarContext.Provider
      value={{
        hasError,
        setHasError,
        imageLoaded,
        setImageLoaded,
      }}
    >
      <AvatarRoot ref={ref} {...props} />
    </AvatarContext.Provider>
  );
});

AvatarRoot.displayName = "AvatarRoot";
Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
`}
      previewCode={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AvatarExample() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="px-5 py-5">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Avatar
                        </Text>
                        <Text className="text-base mb-4 text-muted-foreground">
                            An image component with a fallback for user avatars and profile pictures
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Default Avatar
                        </Text>
                        <View className="flex-row gap-4">
                            <Avatar>
                                <AvatarImage
                                    source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                                    alt="Profile picture"
                                />
                                <AvatarFallback>TR</AvatarFallback>
                            </Avatar>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Avatar Sizes
                        </Text>
                        <View className="flex-row items-center gap-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                                    alt="Small avatar"
                                />
                                <AvatarFallback>TR</AvatarFallback>
                            </Avatar>

                            <Avatar>
                                <AvatarImage
                                    source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                                    alt="Default avatar"
                                />
                                <AvatarFallback>TR</AvatarFallback>
                            </Avatar>

                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                                    alt="Large avatar"
                                />
                                <AvatarFallback>TR</AvatarFallback>
                            </Avatar>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Fallback
                        </Text>
                        <View className="flex-row gap-4">
                            <Avatar>
                                <AvatarImage
                                    source={{ uri: "https://invalid-image-url.png" }}
                                    alt="Invalid image"
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>

                            <Avatar>
                                <AvatarImage
                                    source={{ uri: "https://another-invalid-url.png" }}
                                    alt="Invalid image"
                                />
                                <AvatarFallback>AB</AvatarFallback>
                            </Avatar>

                            <Avatar>
                                <AvatarFallback>MK</AvatarFallback>
                            </Avatar>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Styling
                        </Text>
                        <View className="flex-row gap-4">
                            <Avatar className="bg-primary">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    PR
                                </AvatarFallback>
                            </Avatar>

                            <Avatar className="bg-secondary">
                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                    SC
                                </AvatarFallback>
                            </Avatar>

                            <Avatar className="border-2 border-destructive">
                                <AvatarImage
                                    source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                                    alt="Bordered avatar"
                                    className="border-sm border-background"
                                />
                                <AvatarFallback>BD</AvatarFallback>
                            </Avatar>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
} `}
      registryName="avatar"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
