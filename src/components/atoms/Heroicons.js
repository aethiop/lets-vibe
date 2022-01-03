import React from "react"
import { createIcon } from "native-base"
import { Path } from "react-native-svg"
import { icons } from "../../lib/icons"
export const Heroicons = (props) => {
    const { name, size, color, style, ...rest } = props
    const Icon = createIcon({
        viewBox:"0 0 24 24",
        path: [
            <Path d={icons[name]} fill={color} />
        ]
    })
    return (<Icon {...rest} style={[{ width: size, height: size }, style]} />)
}