import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, useOTPInput } from "@/components/ui/input-otp";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputOTPExample() {
    // Basic OTP
    const basicOtp = useOTPInput(4);

    // Verification OTP
    const verificationOtp = useOTPInput(6);

    // PIN code OTP
    const pinOtp = useOTPInput(4);

    // Phone verification OTP
    const phoneOtp = useOTPInput(4);

    // Handle verify button press
    const handleVerify = () => {
        if (verificationOtp.isComplete) {
            Alert.alert("Success", `Code verified: ${verificationOtp.value}`);
        } else {
            Alert.alert("Error", "Please enter the complete code");
        }
    };

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView
                        className="p-4"
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                OTP Input
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Input component for one-time passwords and verification codes.
                            </Text>
                            <Text className="text-sm mb-2 text-muted-foreground">
                                Tap on any slot to focus and bring up the numeric keyboard.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic OTP Input
                            </Text>
                            <InputOTP
                                value={basicOtp.value}
                                onChange={basicOtp.setValue}
                                maxLength={4}
                                containerClassName="justify-center"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>
                            <View className="flex-row justify-between items-center mt-2">
                                <Text className="text-sm text-muted-foreground">
                                    {basicOtp.isComplete ? "Complete!" : "Tap to enter code"}
                                </Text>
                                {basicOtp.value.length > 0 && (
                                    <TouchableOpacity onPress={basicOtp.clear}>
                                        <Text className="text-sm text-primary">Clear</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Verification Code
                            </Text>
                            <View className="mb-4">
                                <Text className="text-sm font-medium mb-2 text-foreground text-center">
                                    Enter the 6-digit code sent to your phone
                                </Text>
                                <InputOTP
                                    value={verificationOtp.value}
                                    onChange={verificationOtp.setValue}
                                    maxLength={6}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </View>
                            <View className="flex-row justify-center items-center">
                                <Button
                                    onPress={handleVerify}
                                    className={!verificationOtp.isComplete ? "opacity-50 mr-2" : "mr-2"}
                                    disabled={!verificationOtp.isComplete}
                                >
                                    <Text className="font-bold text-primary-foreground">
                                        Verify Code
                                    </Text>
                                </Button>
                                {verificationOtp.value.length > 0 && (
                                    <Button
                                        variant="outline"
                                        onPress={verificationOtp.clear}
                                    >
                                        <Text className="font-medium text-foreground">Clear</Text>
                                    </Button>
                                )}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                PIN Code
                            </Text>
                            <View>
                                <Text className="text-sm font-medium mb-2 text-foreground text-center">
                                    Enter your PIN
                                </Text>
                                <InputOTP
                                    value={pinOtp.value}
                                    onChange={pinOtp.setValue}
                                    maxLength={4}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="rounded-full h-16 w-16 mx-1"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <View className="flex-row justify-center items-center mt-4">
                                    <Text className="text-sm text-muted-foreground mr-2">
                                        {pinOtp.isComplete ? "PIN complete" : "Tap to enter PIN"}
                                    </Text>
                                    {pinOtp.value.length > 0 && (
                                        <TouchableOpacity onPress={pinOtp.clear}>
                                            <Text className="text-sm text-primary">Reset</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Phone Verification with Icon
                            </Text>
                            <View>
                                <View className="flex-row items-center justify-center mb-4">
                                    <Ionicons name="phone-portrait-outline" size={24} color="gray" className="mr-2" />
                                    <Text className="text-sm font-medium text-foreground">
                                        Enter the code sent to +1 (555) 123-4567
                                    </Text>
                                </View>
                                <InputOTP
                                    value={phoneOtp.value}
                                    onChange={phoneOtp.setValue}
                                    maxLength={4}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="h-14 w-14 mx-2 rounded-lg"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <View className="items-center mt-4">
                                    <Button
                                        className={phoneOtp.isComplete ? "bg-primary" : "bg-primary/50"}
                                        disabled={!phoneOtp.isComplete}
                                    >
                                        <Text className="font-bold text-primary-foreground">
                                            Submit
                                        </Text>
                                    </Button>
                                    <TouchableOpacity className="mt-2">
                                        <Text className="text-sm text-primary">Resend Code</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
