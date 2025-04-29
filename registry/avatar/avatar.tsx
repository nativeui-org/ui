import * as React from "react";
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
