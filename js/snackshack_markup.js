
function buildMarkup(){
    document.body.innerHTML = `
        <div id="camera-layer">
            <video id="video" autoplay></video>
            <select id="videoSource"></select>
        </div>
        <a-scene embedded id="experience-overlay-container">
            <a-assets>
                <img id="chips-texture" src="../media/texture/chips.png" preload="true"/>
                <img id="stream-texture" src="../media/texture/stream.png" preload="true"/>
                <img id="deliver-texture" src="../media/texture/deliver.png" preload="true"/>
                <img id="backwoods-texture" src="../media/texture/backwoods.png" preload="true"/>
                <img id="selected-texture" src="../media/texture/checkmark.png" preload="true" />

                <img id="drinks-texture" src="../media/texture/drinks.png" preload="true"/>
                <img id="snacks-texture" src="../media/texture/snacks.png" preload="true"/>
                <img id="lighter-texture" src="../media/texture/lighter.png" preload="true"/>

                <img id="yis-texture" src="../media/texture/YIS.png" preload="true"/>
                <img id="lumiere-texture" src="../media/texture/lumiere.png" preload="true"/>
                <img id="old-row-texture" src="../media/texture/hov-md.png" preload="true"/>
                <img id="ss8300-texture" src="../media/texture/ss8300.png" preload="true"/>
                <img id="krs-texture" src="../media/texture/krs.png" preload="true"/>
                <img id="earth-uncensored-texture" src="../media/texture/earth-uncovered.png" preload="true"/>
            </a-assets>

            <!-- PAGE 0 -->
            <a-entity id="snack-shack-title-banner" class="application-page-0-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: SNACK SHACK; width: 10; color: white; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -6" rotation="0 0 0" visible="true"></a-entity>

            <a-entity id="snack-shack-title-label" class="application-page-0-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: a decentralied immersive application \n for late night convenience; width: 10; color: white; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 4 -6" rotation="0 0 0" visible="true"></a-entity>

            <!-- STREAM MENU OPTION [1] -->
            <a-entity id="stream-menu-option" class="application-page-0-asset application-asset" visible="true" geometry="primitive: sphere; radius: 0.8;" position="-2.5 2.2 -6" rotation="0 -90 0" material="src: #stream-texture;">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: stream; width: 10; color: white; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0.5" rotation="0 90 0"></a-entity>
            </a-entity>

            <!-- DELIVER MENU OPTION [3] -->
            <a-entity id="deliver-menu-option" class="application-page-0-asset application-asset" visible="true" geometry="primitive: sphere; radius: 0.8;" position="2.5 2.2 -6" rotation="0 -90 0" material="src: #deliver-texture;">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: deliver; width: 10; color: white; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 -0.5" rotation="0 90 0"></a-entity>
            </a-entity>

            <a-entity id="selected-option" visible="false" geometry="primitive: sphere; radius: 0.5" position="0 2.2 -4" rotation="0 90 0" material="src: #selected-texture;"></a-entity>



            <!-- PAGE 1 -->
            <a-entity id="stream-menu-title" class="application-page-1-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: STREAM; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="stream-menu-label" class="application-page-1-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: select a channel or series; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="cinema-lumiere-option" class="application-page-1-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #lumiere-texture;">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: CINEMA LUMIERE; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="space-option" class="application-page-1-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="0 2.2 -4" rotation="0 0 0" material="src: #yis-texture;">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: SPACE; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="old-row-md-option" class="application-page-1-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="4.5 2.2 -4" rotation="0 0 0" material="src: #old-row-texture;">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: OLD ROW MD; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="starsystem8300-option" class="application-page-1-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="0 -1.2 -4" rotation="0 0 0" material="src: #krs-texture;">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: KRS; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>



            <!-- PAGE 2 -->
            <a-entity id="stream-channel-title" class="application-page-2-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: CHANNEL; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="stream-channel-label" class="application-page-2-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: current media description; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="stream-viewer-pane" class="application-page-2-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="4.5 -1.2 -4" rotation="0 0 0" material="src: #ss8300-texture;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: STARSYSTEM 8300; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>



            <!-- PAGE 3 -->
            <a-entity id="deliver-menu-title" class="application-page-3-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: DELIVER; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0"  visible="false"></a-entity>

            <a-entity id="deliver-menu-title" class="application-page-3-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: select a category; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="drinks-menu-option" class="application-page-3-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: DRINKS; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="snacks-menu-option" class="application-page-3-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="0 2.2 -4" rotation="0 0 0" material="src: #snacks-texture; side: double;  visible="false"">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: SNACKS; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="lighters-menu-option" class="application-page-3-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="4.5 2.2 -4" rotation="0 0 0" material="src: #lighter-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: 18+; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>



            <!-- PAGE 4 -->
            <a-entity id="deliver-drinks-menu-title" class="application-page-4-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: DRINKS; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="deliver-drinks-menu-label" class="application-page-4-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: select a drink; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="iced-tea-option" class="application-page-4-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: ICED TEA; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="fruit-punch-option" class="application-page-4-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="0 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: FRUIT PUNCH; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="half-n-half-option" class="application-page-4-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: HALF n HALF; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="orange-juice-option" class="application-page-4-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-2 -0.8 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: ORANGE JUICE; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="water-option" class="application-page-4-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="2 -0.8 -4" rotation="0 0 0" material="src: #drinks-texture; side:double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: WATER; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>



            <!-- PAGE 5 -->
            <a-entity id="deliver-snacks-menu-title" class="application-page-5-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: SNACKS; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="deliver-snacks-menu-label" class="application-page-5-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: select a snack; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="chips-option" class="application-page-5-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: ICED TEA; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>

            <a-entity id="crepes-option" class="application-page-5-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: ICED TEA; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>



            <!-- PAGE 6 -->
            <a-entity id="deliver-18-menu-title" class="application-page-6-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: 18+; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="deliver-18-menu-label" class="application-page-6-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: ; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="lighters-option" class="application-page-6-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: DRINKS; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>



            <!-- PAGE 7 -->
            <a-entity id="deliver-18-menu-title" class="application-page-7-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: 18+; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>



            <!-- PAGE 8 -->
            <a-entity id="payment-page-title" class="application-page-8-asset application-asset" geometry="primitive: plane; width: 5; height: 1.5;" text="value: 18+; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5.5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="payment-page-label" class="application-page-8-asset application-asset" geometry="primitive: plane; width: 8; height: 1.5;" text="value: ; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="0 5 -5" rotation="0 0 0" visible="false"></a-entity>

            <a-entity id="payment-form" class="application-page-8-asset application-asset" visible="false" geometry="primitive: plane; width: 3; height: 2;" position="-4.5 2.2 -4" rotation="0 0 0" material="src: #drinks-texture; side: double;" visible="false">
                <a-entity geometry="primitive: plane; width: 2; height: 2.5;" text="value: PAYMENT; width: 10; color: black; align: center; font: mozillavr;" material="opacity: 0; color: black;" position="-0.5 -1 0" rotation="0 0 0"></a-entity>
            </a-entity>
        </a-scene>
    `;
}
