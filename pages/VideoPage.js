import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";

function VideoPage() {

    return (
        <div>
            <iframe id="player" type="text/html" width="640" height="360" 
            src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com" frameborder="0">
            </iframe> 
        </div>
    )
}

export default VideoPage;
