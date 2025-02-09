function ME_Manifest_Export(){
    if (document.getElementById('AB_Article_Export_FileName').value != null || document.getElementById('AB_Article_Export_FileName').value != ""){
        let Data = AB_Editor_Data;
        var Data_JSON = JSON.stringify(Data, null, 2);
        const Data_Blob = new Blob([Data_JSON], {type: 'application/json'});
        saveAs(Data_Blob, document.getElementById('AB_Article_Export_FileName').value + ".cbe_ab");
        Subwindows_Close('AB_Editor_Article_Export');
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Article exported", "The file will be downloaded shortly.");
    } else {
        Subwindows_Open('AB_Editor_Error_Export_FileNameEmpty');
    }
}

function ME_Manifest_Import(){
    var File_Element = document.getElementById("ME_Manifest_Import_File");
    var File_Element_File = File_Element.files[0];
    const Reader = new FileReader();
    Reader.onload = function(e){
        const Contents = e.target.result;
        const Data_JSON = JSON.parse(Contents);
        Manifest = Data_JSON;
        ME_Manifest_Render();
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Manifest imported", `Manifest data successfully loaded.`);
    }

    Reader.readAsText(File_Element_File);
    Subwindows_Close("ME_Manifest_Import");
}

var Manifest = {};

function ME_Manifest_Render(){
    document.getElementById("ME_Editor").innerHTML = "";
    var Subjects = Manifest.Subject;
    for (a = 0; a < Subjects.length; a++){
        var Subject = Subjects[a];
        var Subject_Item_InnerHTML = `
            <div class="Accordion_Title" onclick="Accordion_Toggle(this.parentNode.id)">
                <h2 class="Accordion_Title_Text">
                    ${Subject.Subject_Name}
                </h2>
                <img class='Accordion_Title_Arrow ME_Edit_Controls' src='Assets/Icons/icon_downArrow.png' draggable='false' loading='lazy'/>
                <img class="ME_Edit_Controls" src="Assets/Icons/iconNew_edit.png"/>
                <img class="ME_Edit_Controls" src="Assets/Icons/iconNew_delete.png"/>
            </div>
            <div class="Accordion_Content" State="Expanded" id="Subject_${a}">
            </div>
        `;
        var Subject_Item = document.createElement("div");
        Subject_Item.setAttribute("class", "Accordion ME_Subject");
        Subject_Item.setAttribute("id", `Accordion_${a}`);
        Subject_Item.innerHTML = Subject_Item_InnerHTML
        document.getElementById("ME_Editor").appendChild(Subject_Item);

        var Periods = Subject.Subject_Module
        console.log(Periods);
        for (b = 0; b < Periods.length; b++){
            var Period = Periods[b];
            var Period_Item_InnerHTML = `
                <div class="Accordion_Title" onclick="Accordion_Toggle(this.parentNode.id)">
                    <h2 class="Accordion_Title_Text">
                        ${Period.Module_Name}
                    </h2>
                    <img class='Accordion_Title_Arrow ME_Edit_Controls' src='Assets/Icons/icon_downArrow.png' draggable='false' loading='lazy'/>
                    <img class="ME_Edit_Controls" src="Assets/Icons/iconNew_edit.png"/>
                    <img class="ME_Edit_Controls" src="Assets/Icons/iconNew_delete.png"/>
                </div>
                <div class="Accordion_Content ME_Subject_Period_List" State="Expanded" id="Subject_${a}_Period_${b}">
                </div>
            `;
            var Period_Item = document.createElement("div");
            Period_Item.setAttribute("class", "Accordion ME_Subject_Period");
            Period_Item.setAttribute("id", `Accordion_${a}_${b}`);
            Period_Item.innerHTML = Period_Item_InnerHTML
            document.getElementById(`Subject_${a}`).appendChild(Period_Item);

            var Quizzes = Period.Module_Subfolders;
            for (c = 0; c < Quizzes.length; c++){
                var Quiz = Quizzes[c];
                var Quiz_Item_InnerHTML = `
                    <div class="Toggle" id="Subject_${a}_Period_${b}_Item_${c}" onclick="Buttons_Toggle(this.id)" State="Active">
                        <div class="Toggle_Indicator"></div>
                        ${Quiz.Subfolder_Name}
                    </div>
                    <img class="General_Button_Icon ME_Edit_Controls" src="Assets/Icons/iconNew_edit.png"/>
                    <img class="General_Button_Icon ME_Edit_Controls" src="Assets/Icons/iconNew_delete.png"/>
                `;
                var Quiz_Item = document.createElement("span");
                Quiz_Item.setAttribute("class", "ME_Subject_Period_List_Item");
                Quiz_Item.innerHTML = Quiz_Item_InnerHTML;
                document.getElementById(`Subject_${a}_Period_${b}`).appendChild(Quiz_Item);
            }
        }
    }
}