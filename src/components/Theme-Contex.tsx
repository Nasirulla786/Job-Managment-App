//@ts-nocheck
import { Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";

export default function ThemeContex({ children }) {


    return (
        <div>

            <Theme>
                {/* <NavBar /> */}
                {children}
            </Theme>
        </div>
    )
}