var srNo = 1;
$(document).ready(function () {
    LoadTaxDetails('');
});

function LoadTaxDetails(SearchBy) {
    try {

        var input = {
            'type': 'All',
            'TCode': '',
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "TaxDeails.aspx/GetTaxDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {
                        var _html = null;
                        $("#tbody_TaxDetails").html('');

                        $.each(data.Headers, function (key, item) {
                            //item.EmailId = "ASHAPURA123ENTERPRISES@GMAIL.COM";
                            _html += "<tr style='border:0px solid red;min-height:30px;' id='tablerow_" + item.TCode + "'>";
                            _html += "<td class='Center'>" + srNo + "</td>";
                            _html += "<td class='Center'>" + item.TName + "</td > ";
                            _html += "<td class='Center'>" + item.Tvalue + "</td>";
                            _html += "<td class='Center'>" + item.CCreatedBy + "</td>";
                            _html += "<td class='Center'>" + item.CreatedDate + "</td>";
                            _html += "<td class='Center'><span class='btn btn-red btn-sm' onclick=GetTaxDetailsbyId('" + item.TCode + "') style='cursor:pointer;'><span class='glyphicon glyphicon-edit'></span></span></td>";
                            _html += "<td class='Center'><span class='btn btn-red btn-sm btn_Delete' onclick=DeleteTaxDetails('" + item.TCode + "') style='cursor:pointer;'><span class='glyphicon glyphicon-trash'></span></td>";
                            _html += "</tr>";
                            srNo = srNo + 1;
                        });

                        $("#tbody_TaxDetails").append(_html);
                    }
                    $("#preloader").hide();
                }
                else {
                    $("#tbody_TaxDetails").html('');
                    $("#tbody_TaxDetails").append("<tr><td colspan='7' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        $("#preloader").hide();
    }
}


function AddTaxDetails() {
    try {
        var TaxCode = $("#hdn_taxCode").val();
        var TaxName = $("#txt_TaxtName").val();
        var TaxValue = $("#txt_TaxValue").val();
        var input = {
            'TaxCode': TaxCode,
            'TaxName': TaxName,
            'TaxValue': TaxValue
        }
        $("#preloader").show();

        $.ajax({
            type: "POST",
            url: "TaxDeails.aspx/AddTaxDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {
                        LoadTaxDetails('');
                        $("#div_AddTax").addClass('hidden');
                        MessageCenter(data.Headers, "green");
                        Reset();
                    }
                    $("#preloader").hide();
                }
                else {
                    $("#tbody_CustomerDetails").html('');
                    $("#tbody_CustomerDetails").append("<tr><td colspan='9' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
                    $("#table_tfooter").html('');
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}

function Callfunction(pageNo) {
    //$("#td_Pageing_" + pageNo).css("background-color", "red");
    //$("#td_Pageing_" + pageNo).css("color", "blue");
    if ($.trim(parseInt(pageNo)) != 1)
        srNo = (((pageNo * 25) - 25) + 1);
    else srNo = 1;
    LoadAllStocks(pageNo, '');

}

function ShowTax() {
    $("#lnk_Submit").val('Submit');
    $("#div_AddTax").removeClass('hidden');

    $("#div_SearchTaxDetails").addClass('hidden');
}


function CheckEnterPress(e) {
    if (e.which == 13) {
        document.getElementById("btn_Search").click();
    }
}

function GetTaxDetailsbyId(TCode) {
    console.log(TCode);
    try {
        $("#div_AddTax").removeClass('hidden');
        var SearchBy = '';
        MessageCenter('', "green");
        var input = {
            'type': '',
            'TCode': TCode,
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "TaxDeails.aspx/GetTaxDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {
                        $("#txt_TaxtName").val(data.Headers[0].TName);
                        $("#txt_TaxValue").val(data.Headers[0].Tvalue);
                        $("#hdn_taxCode").val(data.Headers[0].TCode)
                        $("#lnk_Submit").val('Update');
                    }

                    $("#preloader").hide();
                }
                else {
                }
            }
        });
    } catch (e) {
        $("#preloader").hide();
    }
}


function DeleteTaxDetails(TaxCode) {
    try {
        MessageCenter('', "green");
        var input = {
            'TaxCode': TaxCode
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "TaxDeails.aspx/DeleteTaxDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {
                        $("#tablerow_" + TaxCode).html('');
                        MessageCenter(data.Headers, 'green');
                    }

                    $("#preloader").hide();
                }
                else {
                }
            }
        });
    } catch (e) {
        $("#preloader").hide();
    }
}

function SearchTaxDetails() {

    var txt_Search = $("#txt_search");

    if (txt_Search.val() != "") {
        $("#table_tfooter").html('');
        LoadTaxDetails(1, txt_Search.val());
    }
    else {
        MessageCenter("Please Enter Search text.", "red");
        txt_Search.focus();
    }

}

function ShowTaxDiv() {
    $("#div_SearchTaxDetails").removeClass('hidden');

    $("#div_AddTax").addClass('hidden');
}