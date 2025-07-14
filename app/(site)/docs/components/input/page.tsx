import { ComponentPreview } from "@/components/docs/component-preview";

export default function InputPage() {
  return (
    <ComponentPreview
      name="Input"
      description="An input component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Input } from \"@nativeui/ui\";\n\nexport default function InputDemo() {\n  return (\n    <Input>\n      Click me\n    </Input>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react"
import { TextInput, Platform } from "react-native"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<TextInput, React.ComponentProps<typeof TextInput>>(
  ({ className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <TextInput
        className={cn(
          "h-12 w-full rounded-md border border-input bg-transparent px-3 text-primary shadow-sm",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          isFocused ? "border-ring ring-1 ring-ring" : "",
          Platform.OS === "ios" ? "ios:shadow-sm ios:shadow-foreground/10" : "android:elevation-1",
          className
        )}
        ref={ref}
        textAlignVertical="center"
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
`}
      previewCode={`import { Input } from "@nativeui/ui";

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input>Default Input</Input>
      <Input variant="destructive">Delete</Input>
      <Input variant="outline">Outline</Input>
      <Input variant="secondary">Secondary</Input>
      <Input variant="ghost">Ghost</Input>
      <Input variant="link">Link</Input>
    </div>
  );
}`}
      registryName="input"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
    />
  );
}
