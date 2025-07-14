import * as React from "react";
import { View, Text, ScrollView, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";

interface TableProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

interface TableHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

interface TableBodyProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

interface TableFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

interface TableRowProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  selected?: boolean;
}

interface TableHeadProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: number;
}

interface TableCellProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: number;
}

interface TableCaptionProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

const Table = React.forwardRef<View, TableProps>(
  ({ className, ...props }, ref) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="w-full"
    >
      <View ref={ref} className={cn("min-w-full", className)} {...props} />
    </ScrollView>
  )
);

const TableHeader = React.forwardRef<View, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
);

const TableBody = React.forwardRef<View, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn("", className)} {...props} />
  )
);

const TableFooter = React.forwardRef<View, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("border-t border-border bg-muted/50", className)}
      {...props}
    />
  )
);

const TableRow = React.forwardRef<View, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "flex flex-row border-b border-border",
        selected && "bg-muted",
        className
      )}
      {...props}
    />
  )
);

const TableHead = React.forwardRef<View, TableHeadProps>(
  ({ className, align = "left", width, children, ...props }, ref) => {
    const style: ViewStyle | undefined = width
      ? {
        width,
        minWidth: width,
        maxWidth: width,
      }
      : undefined;

    return (
      <View
        ref={ref}
        style={style}
        className={cn(
          "py-3 px-4 flex-1",
          align === "center" && "items-center",
          align === "right" && "items-end",
          className
        )}
        {...props}
      >
        <Text className="text-sm font-medium text-muted-foreground">
          {children}
        </Text>
      </View>
    );
  }
);

const TableCell = React.forwardRef<View, TableCellProps>(
  ({ className, align = "left", width, children, ...props }, ref) => {
    const style: ViewStyle | undefined = width
      ? {
        width,
        minWidth: width,
        maxWidth: width,
      }
      : undefined;

    return (
      <View
        ref={ref}
        style={style}
        className={cn(
          "py-3 px-4 flex-1",
          align === "center" && "items-center",
          align === "right" && "items-end",
          className
        )}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className="text-base text-foreground">{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

const TableCaption = React.forwardRef<View, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn("mt-4", className)} {...props}>
      <Text className="text-sm text-muted-foreground text-center">
        {props.children}
      </Text>
    </View>
  )
);

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
