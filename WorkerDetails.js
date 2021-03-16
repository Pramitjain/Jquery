var srNo = 1;
var TotalWeight = 0;
$(document).ready(function () {
    LoadWorkerDetails(1, '');
});

function AddWorkerDetails() {
    try {
        var Worker_Code = $("#hdn_WorkerCode").val();
        var Worker_Name = $("#txt_WorkerName").val();
        var Worker_Address = $("#txt_Address").val();
        var Worker_Mobile = $("#txt_MobileNo").val();
        var Worker_Mobile1 = $("#txt_MobileNo1").val();

        var Worker_City = $("#txt_City").val();
        var Worker_VechileNo = $("#txt_VechileNo").val();
        var Worker_Type = $("#ddl_EntityType").val();
        var vechilePhoto = $("#hdn_VechilePhoto").val();
        var WorkerPhoto = $("#hdn_WorkerPhoto").val();

        var input = {
            'Worker_Code': Worker_Code,
            'Worker_Name': Worker_Name,
            'Worker_Address': Worker_Address,
            'Worker_Mobile': Worker_Mobile,
            'Worker_Mobile1': Worker_Mobile1,
            'Worker_City': Worker_City,
            'Worker_VechileNo': Worker_VechileNo,
            'Worker_Type': Worker_Type,
            'vechilePhoto': vechilePhoto,
            'WorkerPhoto': WorkerPhoto
        }

        $("#preloader").show();

        $.ajax({
            type: "POST",
            url: "WorkerDetails.aspx/UpdateEntityDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {
                        MessageCenter(data.Headers, "green");
                        Reset();
                        $(window).scrollTop(0);
                        LoadWorkerDetails();
                        $("#hdn_VechilePhoto").val('');
                        $("#hdn_WorkerPhoto").val('');
                        $("#span_VechilePhoto").html('');
                        $("#span_WorkerPhoto").html('');
                    }
                    $("#preloader").hide();
                }
                else {
                }
            }
        });
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}


function LoadWorkerDetails(PageIndex, SearchBy) {
    try {

        var input = {
            'ECode': 'acs',
            'PageIndex': PageIndex,
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "WorkerDetails.aspx/GetWorkerDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    var totalRowsCount = data.TotalCount;


                    if (totalRowsCount > 0) {


                        var totalPageCount = (parseFloat)(totalRowsCount / 100);
                        var splitstg = totalPageCount.toString().split(".");

                        totalPageCount = splitstg[0];
                        var additionalCount = splitstg[1];

                        //$("#table_tfooter").html('');
                        BindPaginationData(totalPageCount, totalRowsCount, additionalCount, PageIndex);

                        if (data.Headers != '' && data.Headers != '[]') {
                            var _html = null;
                            $("#tbody_WorkerDetails").html('');
                            $("#table_WorkerDetails").removeClass("hidden");

                            $.each(data.Headers, function (key, item) {
                                //item.EmailId = "ASHAPURA123ENTERPRISES@GMAIL.COM";
                                _html += "<tr style='border:0px solid red;min-height:30px;' id='tablerow_" + item.ECode + "'>";
                                _html += "<td class='Center'>" + srNo + "</td>";
                                _html += "<td class='Center'><a href='../UI/StocksDetails.aspx?Id=" + item.ECode + "'>" + item.EName + "</a ></td > ";
                                _html += "<td class='Center'>" + item.EType + "</td>";
                                _html += "<td class='Center'>" + item.ECity + "</td>";
                                _html += "<td class='Center' id='EmailId_" + item.Id + "' style='word-wrap: break-word;'>" + item.EAddress + "</td>";
                                _html += "<td class='Center'>" + item.EMobile + "</td>";
                                _html += "<td class='Center'>" + item.EMobileNo1 + "</td>";
                                _html += "<td class='Center'>" + item.EVechileNo + "</td>";
                                _html += "<td class='Center hidden'>" + item.VechilePhoto + "</td>";
                                _html += "<td class='Center hidden'>" + item.EntityPhoto + "</td>";
                                if (item.VechilePhoto != null && item.VechilePhoto != '') {
                                    _html += "<td class='Center'>";
                                    var _count = item.VechilePhoto.split(";");
                                    for (var i = 0; i <= _count.length; i++) {
                                        if (_count[i] != null && _count[i] != "") {
                                            _html += "<a href ='../UploadFiles/" + _count[i] + "' target ='_default'><img src='../UploadFiles/" + _count[i] + "' style=height:25px; width: 25px; ' alt='' /></a><span style='margin-left: 10px; cursor: pointer; '></span>";
                                        }
                                    }
                                    _html += "</td>";
                                } else _html += "<td></td>";
                                if (item.EntityPhoto != null && item.EntityPhoto != '') {
                                    _html += "<td class='Center'>";
                                    var _count = item.EntityPhoto.split(";");
                                    for (var i = 0; i <= _count.length; i++) {
                                        if (_count[i] != null && _count[i] != "") {
                                            _html += "<a href ='../UploadFiles/" + _count[i] + "' target ='_default'><img src='../UploadFiles/" + _count[i] + "' style=height:25px; width: 25px; ' alt='' /></a><span style='margin-left: 10px; cursor: pointer;'></span>";
                                        }
                                    }
                                    _html += "</td>";
                                } else _html += "<td></td>";

                                _html += "<td class='Center'>" + item.CCreatedBy + "</td>";
                                _html += "<td class='Center'>" + item.CreatedDate + "</td>";
                                _html += "<td class='Center'><span class='btn btn-red btn-sm' onclick=EditDetails('" + item.ECode + "') style='cursor:pointer;'><span class='glyphicon glyphicon-edit'></span></span></td>";
                                _html += "<td class='Center'><span class='btn btn-red btn-sm btn_Delete' onclick=DeleteCustomerDetails('" + item.ECode + "') style='cursor:pointer;'><span class='glyphicon glyphicon-trash'></span></td>";
                                _html += "</tr>";
                                srNo = srNo + 1;
                            });

                            $("#tbody_WorkerDetails").append(_html);
                        }

                    }
                    $("#preloader").hide();
                }
                else {
                    $("#tbody_WorkerDetails").html('');
                    $("#tbody_WorkerDetails").append("<tr><td colspan='12' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
                    $("#table_tfooter").html('');
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        $("#preloader").hide();
    }
}

function BindPaginationData(totalPageCount, totalRowsCount, additionalCount, PageIndex) {
    try {
        //Load pagination Only First Time
        if ($("#hdn_IsPaggingloaded").val() == 0) {
            if (totalRowsCount >= 11) {

                var cssclass = '';
                var _Pageing = "";
                for (var i = 1; i <= totalPageCount; i++) {
                    if (i == 1) cssclass = 'active'; else cssclass = '';
                    _Pageing += "<li class='pageing page-item " + cssclass + "' id='td_Pageing_" + i.toString() + "' onclick='Callfunction(" + i + "," + PageIndex + ")'><a class='page-link'>" + i.toString() + "</a></li>";
                }


                if (additionalCount != "" && additionalCount != undefined && additionalCount != 0) {

                    totalPageCount = parseInt(totalPageCount) + 1;
                    _Pageing += "<li class='pageing page-item' id='td_Pageing_" + i.toString() + "'><a class='page-link' onclick='Callfunction(" + totalPageCount + "," + PageIndex + ")' >" + totalPageCount + "</a></li>";
                }
                $("#tfoot_CustomerDetails").append(_Pageing);

                $("#hdn_IsPaggingloaded").val('1');
            }
        }
        //$('.pageing').css('background-color', 'white');
        //$('#td_Pageing_' + PageIndex).css('background-color', 'red');
    } catch (e) {
        console.log('2_' + e.message);
    }
}


function Callfunction(pageNo) {
    $(".pageing").each(function () {
        $(this).removeClass("active");
    });
    $("#td_Pageing_" + pageNo).addClass("active");
    if ($.trim(parseInt(pageNo)) != 1)
        srNo = (((pageNo * 100) - 100) + 1);
    else srNo = 1;

    LoadWorkerDetails(pageNo, '');

}

function DeleteCustomerDetails(EntityCode) {
    try {
        MessageCenter('', "green");
        var input = {
            'EntityCode': EntityCode
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "WorkerDetails.aspx/DeleteEntityDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {
                        MessageCenter(data.Headers, 'green');
                        $(window).scrollTop(0);
                        $("#tablerow_" + id).html('');
                    }

                    $("#preloader").hide();
                }
                else {
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        $("#preloader").hide();
    }
}

function SearchWorkerDetails() {
    srNo = 1;
    var txt_Search = $("#txt_search");

    if (txt_Search.val() != "") {
        $("#tfoot_CustomerDetails").html('');
        LoadWorkerDetails(1, txt_Search.val());
    }
    else {
        MessageCenter("Please Enter Search text.", "red");
        txt_Search.focus();
    }

}

function ShowCustomerDiv() {
    $("#div_SearchWorker").removeClass('hidden');
}

function AddCustomer() {
    $("#divWorkerinfo").removeClass('hidden');
    $("#table_WorkerDetails").addClass('hidden');
}

function EditDetails(ECode) {

    $("#divWorkerinfo").removeClass('hidden');
    $("#table_WorkerDetails").addClass('hidden');

    $("#hdn_WorkerCode").val(ECode);
    $('#tablerow_' + ECode).each(function () {
        var currentRow = $(this);


        var WorkerName = (currentRow.find("td:eq(1)").text());
        var EntityType = (currentRow.find("td:eq(2)").text());
        var City = (currentRow.find("td:eq(3)").text());
        var VechileNo = (currentRow.find("td:eq(7)").text());
        var MobileNo = (currentRow.find("td:eq(5)").text());
        var MobileNo1 = (currentRow.find("td:eq(6)").text());
        var Address = (currentRow.find("td:eq(4)").text());
        var VechilePhoto = (currentRow.find("td:eq(8)").text());
        var WorkerPhoto = (currentRow.find("td:eq(9)").text());

        $("#txt_WorkerName").val(WorkerName);
        $("#ddl_EntityType").val(EntityType);
        $("#txt_City").val(City);
        $("#txt_VechileNo").val(VechileNo);
        $("#txt_MobileNo").val(MobileNo);
        $("#txt_MobileNo1").val(MobileNo1);
        $("#txt_Address").val(Address);



        $("#hdn_VechilePhoto").val(VechilePhoto);
        $("#hdn_WorkerPhoto").val(WorkerPhoto);

        $("#span_VechilePhoto").append("<img src='../UploadFiles/" + VechilePhoto + "' style='width:40px;height:40px;'></img>");
        $("#span_WorkerPhoto").append("<img src='../UploadFiles/" + WorkerPhoto + "' style='width:40px;height:40px;'></img>");

        $("#btn_AddWorker").text("Update");

    });

}


function GetFileChangeEvent() {
    try {

        var files = $("#fileToUpload").get(0).files;
        // Add the uploaded image content to the form data collection
        var Name = $("#txt_WorkerName").val();

        if (files.length > 0) {
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append("UploadedImage", files[i]);
            }
            $.ajax({
                url: "FileUploader.ashx?type=Worker&Name=" + Name + "",
                //url: baseUrl + "FileUploadHandler.ashx?&Branch=" + branchCode + "&FromDate=" + FromDate + "&ToDate=" + ToDate + "&DocumentType=" + DocumentType,
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (xhr) {

                    $("#span_VechilePhoto").append("<img src='../UploadFiles/" + xhr + "' style='width:30px;height:30px;'></img>");
                    var PhotoUrl = $("#hdn_VechilePhoto").val() + ";" + xhr;
                    $("#hdn_VechilePhoto").val(PhotoUrl);

                    //$("#td_FileUpload_" + id).empty();
                },
                error: function (err) {
                    MessageCenter(err.statusText, "red");
                }
            });
        }

        else {
            MessageCenter("Please select file to Uploded.", "red");
            $(window).scrollTop(0);
        }
    } catch (e) {
        console.log(e.message);
    }
}


function GetFileChangeEvent1() {
    try {

        var files = $("#fileToUpload1").get(0).files;
        // Add the uploaded image content to the form data collection
        var Name = $("#txt_WorkerName").val();
        if (files.length > 0) {
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append("UploadedImage", files[i]);
            }
            $.ajax({
                url: "FileUploader.ashx?type=Worker&Name=" + Name + "",
                //url: baseUrl + "FileUploadHandler.ashx?&Branch=" + branchCode + "&FromDate=" + FromDate + "&ToDate=" + ToDate + "&DocumentType=" + DocumentType,
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (xhr) {

                    $("#span_CustomerPhoto").append("<img src='../UploadFiles/" + xhr + "' style='width:30px;height:30px;'></img>");

                    var PhotoUrl = $("#hdn_WorkerPhoto").val() + ";" + xhr;
                    $("#hdn_WorkerPhoto").val(PhotoUrl);

                    //$("#td_FileUpload_" + id).empty();
                },
                error: function (err) {
                    MessageCenter(err.statusText, "red");
                }
            });
        }

        else {
            MessageCenter("Please select file to Uploded.", "red");
            $(window).scrollTop(0);
        }
    } catch (e) {
        console.log(e.message);
    }
}