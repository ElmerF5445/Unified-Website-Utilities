
var FS_Preview_Scale = 1;
function FS_Zoom(Direction){
    if (Direction == "Out"){
        FS_Preview_Scale -= 0.1;
    } else if (Direction == "In") {
        FS_Preview_Scale += 0.1;
    }
    FS_Preview_Resize();
}

function FS_Preview_Resize(){
    Element_Attribute_Set("FS_Preview_Container", "style", `transform: scale(${FS_Preview_Scale})`);
}

var FS_Card_SizeMode = "FB";
function FS_SizeMode_Change(Size){
    if (Size == "FB") {
        Element_Attribute_Set("FS_Preview_Container", "Mode", "Facebook");
        Element_Attribute_Set("FS_Preview_Branding", "src", "Assets/ES_FS/Overlay1.png");
    } else if (Size == "IG") {
        Element_Attribute_Set("FS_Preview_Container", "Mode", "Instagram");
        Element_Attribute_Set("FS_Preview_Branding", "src", "Assets/ES_FS/Overlay2.png");
    }
    FS_Card_SizeMode = Size;
}

function FS_TiltMode_Change(Direction){
    if (Direction == "Left") {
        Element_Attribute_Set("FS_Preview_Card", "Tilt", "Left");
        Element_Attribute_Set("FS_Preview_Tape_Image", "src", "Assets/ES_FS/Tape1.png");
    } else if (Direction == "Right") {
        Element_Attribute_Set("FS_Preview_Card", "Tilt", "Right");
        Element_Attribute_Set("FS_Preview_Tape_Image", "src", "Assets/ES_FS/Tape3.png");
    }
}

function FS_Value_Sync(Initiator_ID, Affected_ID){
    Element_Value_Set(Affected_ID, Element_Value_Get(Initiator_ID));
    FS_Text_Update();
}

function FS_Text_Update(){
    Element_Attribute_Set("FS_Preview_Card_Message_Text", "style", `font-size:${Element_Value_Get("FS_Input_Message_Size")}px; line-height:${Element_Value_Get("FS_Input_Message_LineSpace")}pt; letter-spacing:${Element_Value_Get("FS_Input_Message_LetterSpace")}px; margin-top:${Element_Value_Get("FS_Input_Message_Margin_Top")}px`);
    Element_InnerText_Set("FS_Preview_Card_Message_Text", Element_Value_Get("FS_Input_Message"));
    Element_InnerText_Set("FS_Preview_Card_Message_Sender_Text", Element_Value_Get("FS_Input_Sender"));
}

var FS_Card_Count = 0;
var FS_Render_Pass = 0;
function FS_Image_Download(){
    FS_Render_Pass++;
    if (FS_Render_Pass == 0) {
        FS_Card_Count++;
        FS_SizeMode_Change("FB");
    } else if (FS_Render_Pass == 1) {
        FS_SizeMode_Change("FB");
    } else if (FS_Render_Pass == 2) {
        FS_SizeMode_Change("IG");
    }
    
    if (document.getElementById("downloadable") != null){
        document.getElementById("downloadable").remove();
    }   

    Element_Attribute_Set("FS_Preview_Container", "style", `transform: scale(1)`);
    
    
    var WA_ApplyWatermark_Settings_ResolutionScale = 2;
    var FS_Card_Client_Width = document.getElementById("FS_Preview_Container").clientWidth;
    var FS_Card_Client_Height = document.getElementById("FS_Preview_Container").clientHeight;
    console.log(FS_Card_Client_Width + " : " + FS_Card_Client_Height);

    // domtoimage.toBlob(document.getElementById('FS_Preview_Container'), {
    //     width: WA_ImageClientWidth,
    //     height: WA_ImageClientHeight,
    // }).then(function(blob){
    //     window.saveAs(blob, "TESUTO.png");
    // });

    // domtoimage.toJpeg(document.getElementById('FS_Preview_Container'), { quality: 0.95 })
    // .then(function (dataUrl) {
    //     var link = document.createElement('a');
    //     link.download = 'my-image-name.jpeg';
    //     link.href = dataUrl;
    //     link.click();
    // });
    var FS_Card_FileName = `FS25_${FS_Card_Count}_${FS_Card_SizeMode}.png`
    setTimeout(function(){
        html2canvas(document.getElementById("FS_Preview_Container"), {
            scale: 1.2
        }).then(function(canvas) {
            canvas.setAttribute("id", "downloadable");
            // canvas.setAttribute("width", `${FS_Card_Client_Width}`);
            // canvas.setAttribute("height", `${FS_Card_Client_Height}`);
            // console.log(canvas);
            Element_Get_ByID("FS_Outlet").appendChild(canvas);
        });
        setTimeout(function(){
            // Get the canvas
            var canvas = document.getElementById("downloadable");
            // Convert the canvas to data
            var image = canvas.toDataURL();
            // Create a link
            var aDownloadLink = document.createElement('a');
            // Add the name of the file to the link
            aDownloadLink.download = FS_Card_FileName;
            // Attach the data to the link
            aDownloadLink.href = image;
            // Get the code to click the download link
            aDownloadLink.click();
            FS_Preview_Resize();
            if (FS_Render_Pass < 2){
                FS_Image_Download();
            }
        }, 500);
    }, 500);
    
    
}

