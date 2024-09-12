function Settings_Image_Check(Input_ID, Output_ID){
    var Input = document.getElementById(Input_ID);
    var Output = document.getElementById(Output_ID);
    Element_Attribute_Set(Output_ID, "Opacity", "Transparent");
    Element_Attribute_Set("Settings_Backgrounds_Wallpaper_Button", "Clickability", "Disabled");
    setTimeout(function(){
        Output.src = Input.value;
        Output.onload = function(){
            Element_Attribute_Set(Output_ID, "Opacity", "Opaque");
            Element_Attribute_Remove("Settings_Backgrounds_Wallpaper_Button", "Clickability");
        };
        Output.onerror = function(){
            Element_Attribute_Set(Output_ID, "Opacity", "Invisible");
            Element_Attribute_Set("Settings_Backgrounds_Wallpaper_Button", "Clickability", "Disabled");
        };
    }, 1000);
}

function Settings_Save(){
    
}