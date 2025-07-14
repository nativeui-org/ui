import { ComponentPreview } from "@/components/docs/component-preview";

export default function TextareaPage() {
  return (
    <ComponentPreview
      name="Textarea"
      description="A textarea component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Textarea } from \"@nativeui/ui\";\n\nexport default function TextareaDemo() {\n  return (\n    <Textarea>\n      Click me\n    </Textarea>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react"
import { TextInput, Platform } from "react-native"
import { cn } from "@/lib/utils"

const TextArea = React.forwardRef<TextInput, React.ComponentProps<typeof TextInput>>(
  ({ className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <TextInput
        className={cn(
          "min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-3 text-primary shadow-sm",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "text-base multiline",
          isFocused ? "border-ring ring-1 ring-ring" : "",
          Platform.OS === "ios" ? "ios:shadow-sm ios:shadow-foreground/10" : "android:elevation-1",
          className
        )}
        ref={ref}
        multiline={true}
        textAlignVertical="top"
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    )
  }
)

TextArea.displayName = "TextArea"

export { TextArea }
`}
      previewCode={`import { Textarea } from "@nativeui/ui";

export default function TextareaDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Textarea>Default Textarea</Textarea>
      <Textarea variant="destructive">Delete</Textarea>
      <Textarea variant="outline">Outline</Textarea>
      <Textarea variant="secondary">Secondary</Textarea>
      <Textarea variant="ghost">Ghost</Textarea>
      <Textarea variant="link">Link</Textarea>
    </div>
  );
}`}
      registryName="textarea"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
    />
  );
}
