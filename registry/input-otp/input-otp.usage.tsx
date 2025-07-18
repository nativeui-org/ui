import { InputOTP, InputOTPGroup, InputOTPSlot, useOTPInput } from "@/components/ui/input-otp";
import * as React from "react";

export default function InputOTPExample() {
    const basicOtp = useOTPInput(4);

    return (
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
    );
}
