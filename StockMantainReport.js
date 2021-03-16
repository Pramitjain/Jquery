var srNo = 1;
$(document).ready(function () {

    LoadStockMantainReport();


});

function LoadStockMantainReport() {
    try {

        var input = {
            'PurchaseCode': 'avc',
        }
        console.log(1);
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "StockReport.aspx/BindStockMantain_Report",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {

                        var _html = null;
                        var srNo = 1;
                        var SumFinalAmt = 0;
                        var TotalUnit = 0;
                        var Prod1Plus = 0, Prod1Minus = 0;
                        var Prod2Plus = 0, Prod2Minus = 0;
                        var Prod3Plus = 0, Prod3Minus = 0;
                        var Prod4Plus = 0, Prod4Minus = 0;
                        var Prod5Plus = 0, Prod5Minus = 0;
                        var Prod6Plus = 0, Prod6Minus = 0;
                        var Prod7Plus = 0, Prod7Minus = 0;
                        var Prod8Plus = 0, Prod8Minus = 0;
                        var Prod9Plus = 0, Prod9Minus = 0;
                        var Prod10Plus = 0, Prod10Minus = 0;
                        var Prod11Plus = 0, Prod11Minus = 0;
                        $("#tbody_StockManitainReport,#tfoot_StockManitainReport").html('');
                        $.each(data.Headers, function (key, item) {

                            TotalUnit = (parseFloat(item.x15LitreJar) + parseFloat(item.x15LitreBucket) + parseFloat(item.x15KGJar) + parseFloat(item.x5LitreJar) + parseFloat(item.x2LitreJar) + parseFloat(item.x1LitrePouch) + parseFloat(item.xhalfLitreBottle) + parseFloat(item.x200MilliLitreJar) + parseFloat(item.x1LitreBottle) + parseFloat(item.x15SunFlower) + parseFloat(item.x5LitreBucket));


                            if (item.SaleType == "Stock") {
                                Prod1Plus = (parseFloat(Prod1Plus) + parseFloat(item.x15LitreJar));
                                Prod2Plus = (parseFloat(Prod2Plus) + parseFloat(item.x15LitreBucket));
                                Prod3Plus = (parseFloat(Prod3Plus) + parseFloat(item.x15KGJar));
                                Prod4Plus = (parseFloat(Prod4Plus) + parseFloat(item.x5LitreJar));
                                Prod5Plus = (parseFloat(Prod5Plus) + parseFloat(item.x2LitreJar));
                                Prod6Plus = (parseFloat(Prod6Plus) + parseFloat(item.x1LitrePouch));
                                Prod7Plus = (parseFloat(Prod7Plus) + parseFloat(item.xhalfLitreBottle));
                                Prod8Plus = (parseFloat(Prod8Plus) + parseFloat(item.x200MilliLitreJar));
                                Prod9Plus = (parseFloat(Prod9Plus) + parseFloat(item.x1LitreBottle));
                                Prod10Plus = (parseFloat(Prod10Plus) + parseFloat(item.x15SunFlower));
                                Prod11Plus = (parseFloat(Prod11Plus) + parseFloat(item.x5LitreBucket));
                            }
                            else if (item.SaleType = "Sales") {
                                Prod1Minus = (parseFloat(Prod1Minus) + parseFloat(item.x15LitreJar));
                                Prod2Minus = (parseFloat(Prod2Minus) + parseFloat(item.x15LitreBucket));
                                Prod3Minus = (parseFloat(Prod3Minus) + parseFloat(item.x15KGJar));
                                Prod4Minus = (parseFloat(Prod4Minus) + parseFloat(item.x5LitreJar));
                                Prod5Minus = (parseFloat(Prod5Minus) + parseFloat(item.x2LitreJar));
                                Prod6Minus = (parseFloat(Prod6Minus) + parseFloat(item.x1LitrePouch));
                                Prod7Minus = (parseFloat(Prod7Minus) + parseFloat(item.xhalfLitreBottle));
                                Prod8Minus = (parseFloat(Prod8Minus) + parseFloat(item.x200MilliLitreJar));
                                Prod9Minus = (parseFloat(Prod9Minus) + parseFloat(item.x1LitreBottle));
                                Prod10Minus = (parseFloat(Prod10Minus) + parseFloat(item.x15SunFlower));
                                Prod11Minus = (parseFloat(Prod11Minus) + parseFloat(item.x5LitreBucket));
                            }
                            _html += "<tr style='border:0px solid red;min-height:30px;'>";
                            _html += "<td class='Center'>" + srNo + "</td>";
                            //console.log(item.Date);
                            var Seachtxt = (item.Date.toString()).replace("  ", " ");
                            //console.log(Seachtxt);
                            Seachtxt = Seachtxt.replace(" ", "-");

                            var abc = Seachtxt.replace(" ", "-");

                            _html += "<td class='Center'><span style='cursor:pointer;color:#337ab7' class='calculate' data-searchtype='date' data-searchTxt='" + abc + "' >" + item.Date + "<span></td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x15LitreJar) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x15LitreBucket) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x15KGJar) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x15SunFlower) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x5LitreJar) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x2LitreJar) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x1LitrePouch) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.xhalfLitreBottle) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x200MilliLitreJar) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x1LitreBottle) + "</td>";
                            _html += "<td class='Center " + item.SaleType + "'>" + parseFloat(item.x5LitreBucket) + "</td>";
                            var colr = "#ef972a";
                            if (item.SaleType == "Sales") colr = "red";
                            _html += "<td class='Center' style='background-color:" + colr + ";color:white;'><b>" + item.SaleType + "</b></td>";
                            _html += "<td class='Center'>" + parseFloat(TotalUnit) + "</td>";

                            _html += "</tr>";
                            srNo = srNo + 1;
                        });
                        $("#tbody_StockManitainReport").append(_html);
                        var html1 = "";
                        html1 += "<tr>";
                        html1 += "<td class='Center' colspan='2'><b>Remaning Stock</b></td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod1Plus - Prod1Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod2Plus - Prod2Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod3Plus - Prod3Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod10Plus - Prod10Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod4Plus - Prod4Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod5Plus - Prod5Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod6Plus - Prod6Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod7Plus - Prod7Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod8Plus - Prod8Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod9Plus - Prod9Minus) + "</td>";
                        html1 += "<td class='Center Remaning'>" + parseFloat(Prod11Plus - Prod11Minus) + "</td>";


                        html1 += "<td class='Center' colspan='2'><b>Total: <span id='sunStockTotal'></span></b></td>";
                        html1 += "</tr>";
                        html1 += "<tr>";
                        html1 += "<td class='Center' colspan='7'>Warehouse Last Check By:<b> " + data.WarehouseLAsatCheck1 + "</b></td>";

                        html1 += "<td class='Center' colspan='8'>Stock Last Check By:<b> " + data.StockLastCheck1 + "</b></td>";
                        html1 += "</tr>";
                        $("#tfoot_StockManitainReport").append(html1);
                        var sunStockTotal = 0;
                        $('.Remaning').each(function () {
                            var value = $(this).text();
                            if (value != '' && value != null)
                                sunStockTotal = (parseFloat(sunStockTotal) + parseFloat(value));
                        })

                        $("#sunStockTotal").text(sunStockTotal);
                        $("#preloader").hide();

                        $(".calculate").on("click", function myfunction() {
                            var searchtype = $(this).attr("data-searchtype");
                            var searchTxt = $(this).attr("data-searchTxt");
                            var arr = ["jan", "feb", "march", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];



                            sessionStorage.setItem("SearchType", searchtype);

                            var serch = searchTxt.split("-");
                            var month = parseFloat(arr.indexOf(serch[0])) + 1;
                            var len = month.toString().length; if (len == 1) month = "0" + month;
                            searchTxt = serch[2] + "-" + month + "-" + serch[1];
                            sessionStorage.setItem("SearchTxt", searchTxt);

                            window.location.href = "OrderDetails.aspx";
                        })
                    }

                }
                else {
                    $("#tbody_StockManitainReport").html('');
                    $("#tbody_StockManitainReport").append("<tr><td colspan='14' style='width:100%;text-align:left;'>No Result Found for search Criteria </td></tr>");
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}

function SubmitWarehouseCheck() {
    try {
        var f_type = $("#ddl_Checktype").val();
        if (f_type == "" || f_type == "Select") {
            $("#ddl_Checktype").focus();
            MessageCenter("Please Select Check Status.", "red");
            return false;
        }
        var IsSubmit = confirm("Are you Sure you want to Submit Warehouse Check.?");

        if (IsSubmit) {

            $("#preloader").show();

            var xml = '<?xml version="1.0" encoding="utf-16"?><rows>';
            var TotalSum = 0;
            // loop over each table row (tr)
            $("#tfoot_StockManitainReport tr:first").each(function () {
                var currentRow = $(this);
                var f_x15LitreJar = currentRow.find("td:eq(1)").text();
                var f_x15LitreBucket = currentRow.find("td:eq(2)").text();
                var f_x15KGJar = currentRow.find("td:eq(3)").text();
                var f_x15SunFlower = currentRow.find("td:eq(4)").text();
                var f_x5LitreJar = currentRow.find("td:eq(5)").text().replace('₹', '');
                var f_x2LitreJar = currentRow.find("td:eq(6)").text().replace('₹', '');
                var f_x1LitreJar = currentRow.find("td:eq(7)").text();
                var f_xhalfLitreBottle = currentRow.find("td:eq(8)").text();
                var f_x200MilliLitreJar = currentRow.find("td:eq(9)").text();
                var f_x1LitreBottle = currentRow.find("td:eq(10)").text();
                var f_x5LitreBucket = currentRow.find("td:eq(11)").text();

                var f_TotalUnit = $("#sunStockTotal").text();

                xml += '<row>';

                xml += '<f_15LitreJar><![CDATA[' + $.trim(f_x15LitreJar) + ']]></f_15LitreJar>';
                xml += '<f_15LitreBucket><![CDATA[' + $.trim(f_x15LitreBucket) + ']]></f_15LitreBucket>';
                xml += '<f_15KGJar><![CDATA[' + $.trim(f_x15KGJar) + ']]></f_15KGJar>';
                xml += '<f_5LitreJar><![CDATA[' + $.trim(f_x5LitreJar) + ']]></f_5LitreJar>';
                xml += '<f_2LitreJar><![CDATA[' + $.trim(f_x2LitreJar) + ']]></f_2LitreJar>';
                xml += '<f_1LitreJar><![CDATA[' + $.trim(f_x1LitreJar) + ']]></f_1LitreJar>';
                xml += '<f_halfLitreBottle><![CDATA[' + $.trim(f_xhalfLitreBottle) + ']]></f_halfLitreBottle>';
                xml += '<f_200MilliLitreJar><![CDATA[' + $.trim(f_x200MilliLitreJar) + ']]></f_200MilliLitreJar>';
                xml += '<f_1LitreBottle><![CDATA[' + $.trim(f_x1LitreBottle) + ']]></f_1LitreBottle>';
                xml += '<f_15SunFlower><![CDATA[' + $.trim(f_x15SunFlower) + ']]></f_15SunFlower>';
                xml += '<f_x5LitreBucket><![CDATA[' + $.trim(f_x5LitreBucket) + ']]></f_x5LitreBucket>';
                xml += '<f_type><![CDATA[' + $.trim(f_type) + ']]></f_type>';
                xml += '<f_TotalUnit><![CDATA[' + $.trim(f_TotalUnit) + ']]></f_TotalUnit>';
                xml += '</row>';

            });

            xml += " </rows>";
        }

        $("#lnk_Submit").attr("disabled", "disabled");

        var Input = {
            'xmlData': xml
        }

        $.ajax({
            type: "POST",
            url: "StockReport.aspx/Insert_WarehouseCheck_XML",
            data: JSON.stringify(Input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    MessageCenter(data.Headers, "green");
                    LoadStockMantainReport();
                    $("#preloader").hide();
                    $(window).scrollTop(0);
                }
                $("#preloader").hide();
            }

        });
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}

function StockManitainLastCheckReport() {
    srNo = 1;
    LoadStockManitainLastCheckReport(1, '');
    $("#hdn_IsPaggingloaded").val('0');
}

function LoadStockManitainLastCheckReport(PageIndex, SearchBy) {
    try {

        var input = {
            'PageIndex': PageIndex,
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "StockReport.aspx/GetStockManitainLastCheckReport_All",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {

                        var totalRowsCount = data.TotalCount;

                        if (totalRowsCount > 0) {
                            var totalPageCount = (parseFloat)(totalRowsCount / 100);

                            var splitstg = totalPageCount.toString().split(".");

                            totalPageCount = splitstg[0];
                            var additionalCount = splitstg[1];

                            //$("#table_tfooter").html('');
                            BindPaginationData(totalPageCount, totalRowsCount, additionalCount, PageIndex);
                        }

                        var _html = null;


                        $("#tbody_StockManitainLastCheckReport,#tfoot_StockManitainLastCheckReportt").html('');
                        $.each(data.Headers, function (key, item) {
                            var Total = 0;
                            Total = parseFloat(item.x15LitreJar) + parseFloat(item.x15LitreBucket) + parseFloat(item.x15KGJar) + parseFloat(item.x5LitreJar) + parseFloat(item.x2LitreJar) + parseFloat(item.x1LitrePouch) + parseFloat(item.xhalfLitreBottle) + parseFloat(item.x200MilliLitreJar) + parseFloat(item.x1LitreBottle) + parseFloat(item.x15SunFlower);

                            _html += "<tr style='border:0px solid red;min-height:30px;'>";
                            _html += "<td class='Center'>" + srNo + "</td>";
                            _html += "<td class='Center'>" + item.CreatedDate + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15LitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15LitreBucket) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15KGJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15SunFlower) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x5LitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x2LitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x1LitrePouch) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.xhalfLitreBottle) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x200MilliLitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x1LitreBottle) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x5LitreBucket) + "</td>";
                            _html += "<td class='Center'>" + Total + "</td>";
                            _html += "<td class='Center'>" + item.f_Createdby + "</td>";

                            _html += "</tr>";
                            srNo = srNo + 1;
                        });
                        $("#tbody_StockManitainLastCheckReport").append(_html);



                        $("#preloader").hide();
                    }

                }
                else {
                    $("#tbody_StockManitainLastCheckReport").html('');
                    $("#tbody_StockManitainLastCheckReport").append("<tr><td colspan='14' style='width:100%;text-align:left;'>No Result Found for search Criteria </td></tr>");
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        console.log(e.Message);
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
                    _Pageing += "<li class='pageing page-item' id='td_Pageing_" + i.toString() + "'><a class='page-link' onclick='Callfunction(" + totalPageCount + ")' >" + totalPageCount + "</a></li>";
                }
                $("#table_tfooter").html('');
                $("#table_tfooter").append(_Pageing);

                $("#hdn_IsPaggingloaded").val('1');
            }
        }
        $('.pageing').css('background-color', 'white');
        $('#td_Pageing_' + PageIndex).css('background-color', 'red');
    } catch (e) {

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

    LoadStockManitainLastCheckReport(pageNo, '');

}

function GetSaleReport() {
    srNo = 1;
    $("#hdn_IsPaggingloaded").val('0');
    LoadSaleReport(1, '');
}

function LoadSaleReport(PageIndex, SearchBy) {
    try {

        var input = {
            'PageIndex': PageIndex,
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "StockReport.aspx/GetSaleMantain_Report",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {

                        var totalRowsCount = data.TotalCount;

                        if (totalRowsCount > 0) {
                            var totalPageCount = (parseFloat)(totalRowsCount / 100);

                            var splitstg = totalPageCount.toString().split(".");

                            totalPageCount = splitstg[0];
                            var additionalCount = splitstg[1];

                            //$("#table_tfooter").html('');
                            BindPaginationData_LoadSaleReport(totalPageCount, totalRowsCount, additionalCount, PageIndex);
                        }
                        var _html = null;
                        $("#tbody_SalesReport,#tfoot_SalesReport").html('');
                        $.each(data.Headers, function (key, item) {
                            var _InvoiceShared = item.InvoiceShared; var class_Name = 'hidden';
                            if (_InvoiceShared == true) { console.log(_InvoiceShared); class_Name = ''; }


                            var Total = 0;
                            Total = parseFloat(item.x15LitreJar) + parseFloat(item.x15LitreBucket) + parseFloat(item.x15KGJar) + parseFloat(item.x5LitreJar) + parseFloat(item.x2LitreJar) + parseFloat(item.x1LitrePouch) + parseFloat(item.xhalfLitreBottle) + parseFloat(item.x200MilliLitreJar) + parseFloat(item.x1LitreBottle) + parseFloat(item.x15SunFlower) + parseFloat(item.x5LitreBucket);

                            _html += "<tr style='border:0px solid red;min-height:30px;'>";
                            _html += "<td class='Center'>" + srNo + "</td>";
                            _html += "<td class='Center'>" + item.Date + "</td>";

                            var _html3 = "";
                            _html3 = "<span style='cursor:pointer;color:#337ab7;' onclick='OpenCustomerDetails(&#39;" + item.CustomerCode + "&#39;)'>" + item.CustName + "</span>";

                            if ($.trim(item.IsOnlinePay) != "false") {
                                _html3 += "<span style='padding-left:5px'><i class='fa fa-whatsapp' aria-hidden='true' style='font-size:15px; color: green'></i></span>";
                            }

                            if ($.trim(item.IsWhatsApp) != "false")
                                _html3 += "<span style='padding-left:5px'><i class='fa fa-credit-card' aria-hidden='true' style='font-size:15px; color: green'></i></span>";

                            _html += "<td class='Center'>" + _html3 + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15LitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15LitreBucket) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15KGJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x15SunFlower) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x5LitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x2LitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x1LitrePouch) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.xhalfLitreBottle) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x200MilliLitreJar) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x1LitreBottle) + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.x5LitreBucket) + "</td>";
                            _html += "<td class='Center'>" + Total + "</td>";
                            _html += "<td class='Center'><span style='cursor:pointer;color:white;' onclick='PrintOrderBill(&#39;" + item.PurchaseCode + "&#39;)' class='btn btn-red btn-sm' >Print</span></td>";
                            _html += "<td class='Center'><span style='cursor:pointer;color:white;' onclick='UpdateInvoiceShared(&#39;" + item.PurchaseCode + "&#39;)' class='btn btn-red btn-sm'><span id='Share_" + item.PurchaseCode + "' class='" + class_Name + "'> <span class='glyphicon glyphicon-ok'></span> </span>Share</span></td>";
                            _html += "</tr>";
                            srNo = srNo + 1;
                        });
                        $("#tbody_SalesReport").append(_html);



                        $("#preloader").hide();
                    }

                }
                else {
                    $("#tbody_SalesReport").html('');
                    $("#tbody_SalesReport").append("<tr><td colspan='14' style='width:100%;text-align:left;'>No Result Found for search Criteria </td></tr>");
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}

function BindOrderDetails(PageIndex, Search) {
    try {
        MessageCenter('', "green");
        var input = {
            'PageIndex': PageIndex,
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "OrderDetails.aspx/GetAllPurchaseDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    RoleType = data.RoleType;
                    sessionStorage.setItem("RoleType", RoleType);
                    sessionStorage.setItem("UserName", data.UserName);
                    BindStockDetails(data, PageIndex, true);
                }
                else $("#preloader").hide();
            }
        });
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}

function BindPaginationData_LoadSaleReport(totalPageCount, totalRowsCount, additionalCount, PageIndex) {
    try {

        //Load pagination Only First Time
        if ($("#hdn_IsPaggingloaded").val() == 0) {

            if (totalRowsCount >= 11) {

                var cssclass = '';
                var _Pageing = "";
                for (var i = 1; i <= totalPageCount; i++) {
                    if (i == 1) cssclass = 'active'; else cssclass = '';
                    _Pageing += "<li class='pageing page-item " + cssclass + "' id='td_Pageing_" + i.toString() + "' onclick='CallGetSaleReport(" + i + "," + PageIndex + ")'><a class='page-link'>" + i.toString() + "</a></li>";
                }

                if (additionalCount != "" && additionalCount != undefined && additionalCount != 0) {

                    totalPageCount = parseInt(totalPageCount) + 1;
                    _Pageing += "<li class='page-item'><a class='page-link' onclick='CallGetSaleReport(" + totalPageCount + ")' >" + totalPageCount + "</a></li>";
                }

                $("#table_tfooter_SalesReport").html('');
                $("#table_tfooter_SalesReport").append(_Pageing);

                $("#hdn_IsPaggingloaded").val('1');
            }
        }
        $('.pageing').css('background-color', 'white');

    } catch (e) {

    }
}

function CallGetSaleReport(pageNo) {
    $(".pageing").each(function () {
        $(this).removeClass("active");
    });
    $("#td_Pageing_" + pageNo).addClass("active");
    if ($.trim(parseInt(pageNo)) != 1)
        srNo = (((pageNo * 100) - 100) + 1);
    else srNo = 1;

    LoadSaleReport(pageNo, '');

}

function BindStockDetails(data, PageIndex, Search) {
    var totalRowsCount = data.TotalCount;

    if (totalRowsCount > 0) {

        var totalPageCount = (parseFloat)(totalRowsCount / 100);

        var splitstg = totalPageCount.toString().split(".");

        totalPageCount = splitstg[0];
        var additionalCount = splitstg[1];

        var totalRowsCount = data.TotalCount;

        if (totalRowsCount > 0 && Search == true) {
            //$("#table_tfooter").html('');
            BindPaginationData_PendingPayment(totalPageCount, totalRowsCount, additionalCount, PageIndex);

            $(".pageing").each(function () {
                $(this).removeClass("active");
            });

            $("#td_Pageing_" + parseInt(PageIndex)).addClass("active");

        }
        if (data.Table != '' && data.Table != '[]') {
            var _html = "";
            $("#tbody_LoadAllPurchaseDetails").html('');
            var TotalUnitCnt = 0;
            $.each(data.Headers, function (key, item) {
                //item.EmailId = "ASHAPURA123ENTERPRISES@GMAIL.COM";
                TotalUnitCnt = parseFloat(TotalUnitCnt) + parseFloat(item.TotalUnit);
                _html += "<tr style='border:0px solid red;min-height:30px;' id='tablerow_" + item.PurchaseCode + "'>";
                _html += "<td class='Center'>" + srNo + "</td>";
                //_html += "<td class='Center'>" + item.PurchaseCode + "</a></td > ";
                //onclick = 'OpenCustomerDetails(&#39;" + data.Headers[0].CustomerCode + "&#39;)'

                _html += "<td class='Center'><span style='cursor:pointer;color:#337ab7' onclick=loadOrderDetails(&#39;" + item.PurchaseCode + "&#39;)>" + item.CustomerName + "</span></td>";
                _html += "<td class='Center'>" + parseFloat(item.TotalUnit) + "</td>";
                _html += "<td class='Center'><span><b> &#8377;</b> " + parseFloat(item.TotalAmount) + "</td>";

                _html += "<td class='Center'>" + item.Createdby + "</td>";
                _html += "<td class='Center'>" + item.CreatedDate + "</td>";


                if (item.IsPaymentPaid == 1)
                    _html += "<td class='Center'><a style='cursor:pointer;' onClick=GetItemDetails('" + item.PurchaseCode + "')>View Payment</a></td>";
                else
                    _html += "<td class='Center'><a title='Edit' onclick=AddPayment('" + item.PurchaseCode + "','" + PageIndex + "') style='cursor:pointer;'>Add Payment</a></td>";



                _html += "</tr>";
                srNo = srNo + 1;
            });

            $("#tbody_LoadAllPurchaseDetails").append(_html);
            $("#tfoot_LoadAllPurchaseDetails").append("<tr><td colspan='2'></td><td class='Center'><b>Total :" + parseFloat(TotalUnitCnt).toFixed(2) + "</b></td><td colspan='4'></td></tr>")

        }
        $("#preloader").hide();


    }
    else {
        $("#tbody_LoadAllPurchaseDetails").html('');
        $("#tbody_LoadAllPurchaseDetails").append("<tr><td colspan='11' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
        $("#table_tfooter").html('');
        $("#preloader").hide();
    }
}

function BindPaginationData_PendingPayment(totalPageCount, totalRowsCount, additionalCount, PageIndex) {
    try {
        //Load pagination Only First Time
        if ($("#hdn_IsPaggingloaded").val() == 0) {

            if (totalRowsCount >= 11) {

                var _Pageing = "";
                var cssclass = '';

                for (var i = 1; i <= totalPageCount; i++) {
                    if (i == 1) cssclass = 'active'; else cssclass = '';
                    _Pageing += "<li class='pageing page-item " + cssclass + "' id='td_Pageing_" + i.toString() + "' onclick='Callfunction_PendingPayment(" + i + ")'><a class='page-link'onclick='Callfunction_PendingPayment(" + totalPageCount + 1 + ")' >" + i.toString() + "</a></li>";
                }

                if (additionalCount != "" && additionalCount != undefined && additionalCount != 0) {

                    totalPageCount = parseInt(totalPageCount) + 1;
                    _Pageing += "<li class='pageing page-item' id='td_Pageing_" + i.toString() + "'><a class='page-link' onclick='Callfunction_PendingPayment(" + totalPageCount + ")' >" + totalPageCount + "</a></li>";
                }

                $("#ul_PendingPayment").append(_Pageing);

                $("#hdn_IsPendingPayment").val('1');
            }
        }
    } catch (e) {

    }
}

function Callfunction_PendingPayment(pageNo) {
    $(".pageing").each(function () {
        $(this).removeClass("active");
    });
    $("#td_Pageing_" + pageNo).addClass("active");
    if ($.trim(parseInt(pageNo)) != 1)
        srNo = (((pageNo * 100) - 100) + 1);
    else srNo = 1;

    LoadStockManitainLastCheckReport(pageNo, '');

}

function AddPayment(PurchaseCode, PageIndex) {

    sessionStorage.setItem("PurchaseCode", PurchaseCode);

    sessionStorage.setItem("PageNo", PageIndex);

    var seachType = $("#ddl_SearchType").val();

    if (seachType != "Select" && seachType != "") {
        var searchtxt = $("#txt_search").val();
        sessionStorage.setItem("AddPaymentseachType", seachType);
        sessionStorage.setItem("AddPaymentsearchtxt", searchtxt);
    }

    window.location.href = "../UI/AddPayment.aspx";
}

function GetItemDetails(OrderCode) {

    sessionStorage.setItem("id", OrderCode);
    window.location.href = "OrderDetails.aspx";

}

function GetLastPurhcase_Report() {
    GetLastPurhcaseDate_Report('', '', 0, '', '');
}

function GetLastPurhcaseReport_Filter() {
    var Searchtxt = $('#txt_LastPurhcase').val();
    var type = $("#ddl_LastPurhcase").val();
    GetLastPurhcaseDate_Report(Searchtxt, type, 0, '', '');

}

$(document).ready(function () {

    $("#ddl_LastPurhcase").on("change", function () {
        var type = $("#ddl_LastPurhcase").val();

        if (type == 7 || type == 15 || type == 20 || type == 30 || type == 45 || type == 60) {
            $("#ddl_LastPurchase_City,#ddl_LastPurchase_CustomerCode").addClass('hidden');
            $("#txt_LastPurhcase,#btn_LastPurhcase").addClass('hidden');
            GetLastPurhcaseDate_Report('', 'date', type, '', '');
        }
        if (type == 'City') {
            $("#ddl_LastPurchase_City,#ddl_LastPurchase_CustomerCode").removeClass('hidden');
            $("#txt_LastPurhcase,#btn_LastPurhcase").addClass('hidden');
            BindCity_Dropdown('ddl_LastPurchase_City');

        }
        if (type == 'All') {
            $("#ddl_LastPurchase_City,#ddl_LastPurchase_CustomerCode").addClass('hidden');
            $("#txt_LastPurhcase,#btn_LastPurhcase").removeClass('hidden');
            GetLastPurhcaseDate_Report('', '', 0, '', '');
        }
    });

    $("#ddl_LastPurchase_CustomerCode").on("change", function () {
        var type = $("#ddl_LastPurhcase").val();
        var CustomerCity = $("#ddl_LastPurchase_City").val();
        var CustomerName = $("#ddl_LastPurchase_CustomerCode").val();
        GetLastPurhcaseDate_Report('', type, 0, CustomerCity, CustomerName);
    });

    $("#ddl_LastPurchase_City").on("change", function () {
        var type = $("#ddl_LastPurhcase").val();
        var CustomerCity = $("#ddl_LastPurchase_City").val();
        GetLastPurhcaseDate_Report('', type, 0, CustomerCity, '');
    });
})

function GetLastPurhcaseDate_Report(Searchtxt, type, days, CustomerCity, CustomerName) {
    try {
        var input = {
            'Searchtxt': Searchtxt,
            'type': type,
            'days': days,
            'CustomerCity': CustomerCity,
            'CustomerName': CustomerName
        }

        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "StockReport.aspx/GetLastPurhcaseDate_Report",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {
                        var _html = '';
                        var srNo = 0;
                        $("#tbody_LastPurhcase").html('');
                        $.each(data.Headers, function (key, item) {
                            srNo = srNo + 1;
                            _html += "<tr>";

                            _html += "<td class='Center'>" + srNo + "</td>";
                            //_html += "<td class='Center'>" + item.CustomerCode + "</td>";
                            _html += "<td class='Center'>" + item.CustomerName + "<br/>(" + item.CustomerCity + ") <span class='glyphicon glyphicon-earphone hidden-lg hidden-md'></span>&nbsp;<a href='tel: " + item.CreatedDate + "' class='anchor' target='_blank' rel='noopener'>" + item.CreatedDate + "</a></td>";
                            _html += "<td class='Center'>" + item.DaysfromLastPurchase + " Days</td>";

                            //_html += "<td class='Center'>" + item.CreatedDate + "</td>";
                            _html += "<td class='Center'>" + item.OrderDate + "</td>";
                            _html += "<td class='Center'>" + item.TotalUnit + "</td>";
                            _html += "</tr>";

                        });
                        $("#tbody_LastPurhcase").append(_html);
                        $("#preloader").hide();
                    }

                }
                else {
                    $("#tbody_LastPurhcase").html('');
                    $("#tbody_LastPurhcase").append("<tr><td colspan='8' style='width:100%;text-align:left;'>No Result Found for search Criteria </td></tr>");
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}

function GetPendingPayment() {
    GetPendingPaymentDetails('', '');
}

function GetPendingPaymentFilter() {
    var Searchtxt = $('#txt_SearchPendingPayemnt').val();
    var type = $("#ddl_SearchType").val();
    GetPendingPaymentDetails(Searchtxt, type);
}

function GetPendingPaymentDetails(Searchtxt, type) {
    try {

        var input = {
            'Searchtxt': Searchtxt,
            'type': type
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "StockReport.aspx/GetAllPendingPayment_Report",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {

                        var _html = '';
                        var srNo = 0;
                        var _sum = 0;
                        $("#tbody_LoadPendingPayment,#tfoot_LoadPendingPayment").html('');

                        $.each(data.Headers, function (key, item) {
                            srNo = srNo + 1;
                            _sum = parseFloat(_sum) + parseFloat(item.TotalAmount);

                            var Seachtxt = (item.OrderDate.toString()).replace("  ", " ");
                            //console.log(Seachtxt);
                            Seachtxt = Seachtxt.replace(" ", "-");

                            var abc = Seachtxt.replace(" ", "-");

                            _html += "<tr>";

                            _html += "<td class='Center'>" + srNo + "</td>";
                            var _html3 = "";
                            _html3 = "<span style='cursor:pointer;color:#337ab7' class='PendingPayment' data-searchtype='date' data-searchTxt='" + abc + "' >" + item.CustomerName + "<span>";
                            if ($.trim(item.OnlinePay) != "false") {
                                _html3 += "<span style='padding-left:5px'><i class='fa fa-whatsapp' aria-hidden='true' style='font-size:15px; color: green'></i></span>";
                            }

                            if ($.trim(item.WhatsApp) != "false")
                                _html3 += "<span style='padding-left:5px'><i class='fa fa-credit-card' aria-hidden='true' style='font-size:15px; color: green'></i></span>";

                            _html += "<td class='Center'>" + _html3 + "</td>";

                            _html += "<td class='Center'>" + item.OrderCode + "</td>";
                            _html += "<td class='Center'>" + item.OrderDate + "</td>";
                            _html += "<td class='Center'>" + item.TotalUnit + "</td>";
                            _html += "<td class='Center'><b> &#8377;</b> " + parseFloat(item.TotalAmount).toFixed(2) + "</td>";
                            _html += "<td class='Center'>" + item.DaysfromLastPurchase + "</td>";
                            _html += "<td class='Center'> <a title='Edit' style='cursor:pointer;' onclick=AddPayment('" + item.OrderCode + "')>Add Payment</a></td>";
                            _html += "</tr>";

                        });
                        $("#tbody_LoadPendingPayment").append(_html);
                        $("#tfoot_LoadPendingPayment").append("<tr><td colspan='5'></td><td class='Center'><b> &#8377;</b> " + parseFloat(_sum).toFixed(2) + "</td><td colspan='2'></td></tr>");
                        $("#preloader").hide();

                        $(".PendingPayment").on("click", function myfunction() {
                            var searchtype = $(this).attr("data-searchtype");
                            var searchTxt = $(this).attr("data-searchTxt");
                            var arr = ["jan", "feb", "march", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

                            sessionStorage.setItem("SearchType", searchtype);

                            var serch = searchTxt.split("-");
                            var month = parseFloat(arr.indexOf(serch[1])) + 1;

                            var len = month.toString().length; if (len == 1) month = "0" + month;
                            searchTxt = serch[2] + "-" + month + "-" + serch[0];
                            sessionStorage.setItem("SearchTxt", searchTxt);


                            window.location.href = "OrderDetails.aspx";
                        })

                    }

                    else {
                        $("#tbody_LastPurhcase").html('');
                        $("#tbody_LastPurhcase").append("<tr><td colspan='8' style='width:100%;text-align:left;'>No Result Found for search Criteria </td></tr>");
                        $("#preloader").hide();
                    }
                }
            }
        });

    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}

function GetMonthlySales() {
    $("#div_MonthlySaleReport").removeClass('hidden');
    GetMonthlySalesDetails('2020', '', 0, '');
    BindCity_Dropdown('ddl_MonthlySale_City');
}

function BindMonthlySale_Dropdown() {
    var City = $("#ddl_MonthlySale_City").val();
    var Year = $("#ddl_MonthlySale").val();
    if (Year == "Year" || Year == '') {

        Year = "2020";
    }
    var Advance = $("#ddl_Advance").val();
    if (Advance == '') Advance = 0;
    else if (Advance == "Year") {
        Advance = 1000;
    }
    GetMonthlySalesDetails(Year, '', Advance, City);
}

function GetMonthlySales_Filter() {
    var Searchtxt = $("#txt_MonthlySale").val();
    var Year = $("#ddl_MonthlySale").val();
    var Advance = $("#ddl_Advance").val();
    var City = $("#ddl_MonthlySale_City").val();
    if (Advance == '') Advance = 0;
    GetMonthlySalesDetails(Year, Searchtxt, Advance, City);
}

function GetMonthlySalesDetails(Year, Searchtxt, Advance, City) {
    try {

        $("#table_div_MonthlySale").removeClass('hidden');
        var input = {
            'Year': Year,
            'SearchTxt': Searchtxt,
            'Advance': Advance,
            'City': City

        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "StockReport.aspx/GetMonthlySales_Report",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Headers != '' && data.Headers != '[]') {

                        var _html = '';
                        var srNo = 0;
                        $("#tbody_div_MonthlySale,#tfoot_MonthlySale").html('');



                        $.each(data.Headers, function (key, item) {

                            srNo = srNo + 1;
                            _html += "<tr>";

                            _html += "<td class='Center'>" + srNo + "</td>";
                            //_html += "<td class='Center'>" + item.CustomerCode + "</td>";
                            var _html3 = "<span>" + item.CustomerName + "<span class='glyphicon glyphicon-earphone hidden-lg hidden-md'></span>&nbsp;<a href='tel: " + item.CMobile + "' class='anchor' target='_blank' rel='noopener'>" + item.CustomerMobile + "</a><span>";

                            if ($.trim(item.OnlinePay) != "false") {
                                _html3 += "<span style='padding-left:5px'><i class='fa fa-whatsapp' aria-hidden='true' style='font-size:15px; color: green'></i></span>";
                            }

                            if ($.trim(item.WhatsApp) != "false")
                                _html3 += "<span style='padding-left:5px'><i class='fa fa-credit-card' aria-hidden='true' style='font-size:15px; color: green'></i></span>";

                            _html += "<td class='Center'>" + _html3 + "</td>";


                            _html += "<td class='Center'>" + item.DaysfromLastPurchase + " Days</td>";
                            _html += "<td class='Center'><b>" + item.SumCount + "</b></td>";
                            _html += "<td class='Center'>" + item.APRIL + "</td>";
                            _html += "<td class='Center'>" + item.MAY + "</td>";
                            _html += "<td class='Center'>" + item.JUNE + "</td>";
                            _html += "<td class='Center'>" + item.JULY + "</td>";
                            _html += "<td class='Center'>" + item.AUG + "</td>";
                            _html += "<td class='Center'>" + item.SEP + "</td>";
                            _html += "<td class='Center'>" + item.OCT + "</td>";
                            _html += "<td class='Center'>" + item.NOV + "</td>";
                            _html += "<td class='Center'>" + item.DEC + "</td>";
                            _html += "<td class='Center'>" + item.JAN + "</td>";
                            _html += "<td class='Center'>" + item.FEB + "</td>";
                            _html += "<td class='Center'>" + item.MARCH + "</td>";
                            _html += "</tr>";

                        });

                        $("#tbody_div_MonthlySale").append(_html);



                        srNo = 1;
                        _html = "";
                        var _JanTarget = 0; var _JanSales = 0;
                        var _FebTarget = 0; var _FebSales = 0;
                        var _MARTarget = 0; var _MARSales = 0;
                        var _APRTarget = 0; var _APRSales = 0;
                        var _MAYTarget = 0; var _MAYSales = 0;
                        var _JUNTarget = 0; var _JUNSales = 0;
                        var _JULTarget = 0; var _JULSales = 0;
                        var _AUGTarget = 0; var _AUGSales = 0;
                        var _SEPTarget = 0; var _SEPSales = 0;
                        var _OCTTarget = 0; var _OCTSales = 0;
                        var _NOVTarget = 0; var _NOVSales = 0;
                        var _DECTarget = 0; var _DECSales = 0;

                        var color = 'black';
                        $.each(data.Headers1, function (key, item) {
                            _html += "<tr>";

                            if (srNo == 1) color = 'black'; else color = 'red';
                            if ($.trim(item.Type) == "<b>Target</b>") {
                                _JanTarget = item.JAN;
                                _FebTarget = item.FEB;
                                _MARTarget = item.MAR;
                                _APRTarget = item.APR;
                                _MAYTarget = item.MAY;
                                _JUNTarget = item.JUN;
                                _JULTarget = item.JUL;
                                _AUGTarget = item.AUG;
                                _SEPTarget = item.SEP;
                                _OCTTarget = item.OCT;
                                _NOVTarget = item.NOV;
                                _DECTarget = item.DEC;
                            }
                            if ($.trim(item.Type) == "<b>Sale</b>") {
                                _JanSales = item.JAN;
                                _FebSales = item.FEB;
                                _MARSales = item.MAR;
                                _APRSales = item.APR;
                                _MAYSales = item.MAY;
                                _JUNSales = item.JUN;
                                _JULSales = item.JUL;
                                _AUGSales = item.AUG;
                                _SEPSales = item.SEP;
                                _OCTSales = item.OCT;
                                _NOVSales = item.NOV;
                                _DECSales = item.DEC;
                            }

                            //_html += "<td class='Center'>" + srNo + "</td>";
                            //_html += "<td class='Center'>" + item.CustomerCode + "</td>";
                            if (srNo == 1) {
                                _html += "<td class='Center' rowspan='3' colspan='2'><b>" + item.YEAR + "</b></td>";
                            }


                            var _TotalSum = parseFloat(item.APR) + parseFloat(item.MAY) + parseFloat(item.JUN) + parseFloat(item.JUL) + parseFloat(item.AUG) + parseFloat(item.SEP) + parseFloat(item.OCT) + parseFloat(item.NOV) + parseFloat(item.DEC) + parseFloat(item.JAN) + parseFloat(item.FEB) + parseFloat(item.MAR);

                            _html += "<td class='Center'>" + item.Type + "</td>";

                            _html += "<td class='Center'><b>" + parseFloat(_TotalSum).toFixed(2) + "</b></td>";

                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.APR + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.MAY + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.JUN + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.JUL + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.AUG + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.SEP + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.OCT + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.NOV + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.DEC + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.JAN + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.FEB + "</b></td>";
                            _html += "<td class='Center' style='color:" + color + "'><b>" + item.MAR + "</b></td>";

                            _html += "</tr>";
                            srNo = srNo + 1;
                        });

                        var _TotalAchived = parseFloat(((parseFloat(_APRSales) / parseFloat(_APRTarget)) * 100)) + parseFloat(((parseFloat(_MAYSales) / parseFloat(_MAYTarget)) * 100)) + parseFloat(((parseFloat(_JUNSales) / parseFloat(_JUNTarget)) * 100)) + parseFloat(((parseFloat(_JULSales) / parseFloat(_JULTarget)) * 100)) + parseFloat(((parseFloat(_AUGSales) / parseFloat(_AUGTarget)) * 100)) + parseFloat(((parseFloat(_SEPSales) / parseFloat(_SEPTarget)) * 100)) + parseFloat(((parseFloat(_OCTSales) / parseFloat(_OCTTarget)) * 100)) + parseFloat(((parseFloat(_NOVSales) / parseFloat(_NOVTarget)) * 100)) + parseFloat(((parseFloat(_DECSales) / parseFloat(_DECTarget)) * 100)) + parseFloat(((parseFloat(_JanSales) / parseFloat(_JanTarget)) * 100)) + parseFloat(((parseFloat(_FebSales) / parseFloat(_FebTarget)) * 100)) + parseFloat(((parseFloat(_MARSales) / parseFloat(_MARTarget)) * 100));

                        _html += "<tr>";
                        _html += "<td class='Center'><b>%</b></td>";
                        _html += "<td class='Center'><b>" + parseFloat((_TotalAchived) / 12).toFixed(2) + " %</b></td>";

                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_APRSales) / parseFloat(_APRTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_MAYSales) / parseFloat(_MAYTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_JUNSales) / parseFloat(_JUNTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_JULSales) / parseFloat(_JULTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_AUGSales) / parseFloat(_AUGTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_SEPSales) / parseFloat(_SEPTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_OCTSales) / parseFloat(_OCTTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_NOVSales) / parseFloat(_NOVTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_DECSales) / parseFloat(_DECTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_JanSales) / parseFloat(_JanTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_FebSales) / parseFloat(_FebTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "<td class='Center' style='color:green'><b>" + parseFloat(((parseFloat(_MARSales) / parseFloat(_MARTarget)) * 100)).toFixed(2) + " %</b></td>";
                        _html += "</tr>";

                        $("#tfoot_MonthlySale").append(_html);

                        //$("#tfoot_MonthlySale").append("<tr><td colspan='3' class='Center'>Target</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td><td class='Center'>0</td></tr>");

                        $("#preloader").hide();


                        var tableCont = document.querySelector('.table-cont1')
                        /**
                         * scroll handle
                         * @param {event} e -- scroll event
                         */

                        var scrollTop = this.scrollTop;
                        this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';

                        tableCont.addEventListener('scroll', scrollHandle)



                    }

                    else {
                        $("#tbody_div_MonthlySale").html('');
                        $("#tbody_div_MonthlySale").append("<tr><td colspan='8' style='width:100%;text-align:left;'>No Result Found for search Criteria </td></tr>");
                        $("#preloader").hide();
                    }
                }
            }
        });

    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}

function BindMonthlySale_Dropdown_Advance() {
    var Searchtxt = $("#txt_MonthlySale").val();
    var Year = $("#ddl_MonthlySale").val();
    var City = $("#ddl_MonthlySale_City").val();
    var Advance = $("#ddl_Advance").val();
    if (Advance == '') Advance = 0;

    if (Advance == "Year") {
        $("#div_MonthlySale").removeClass("hidden");
    }
    else {
        GetMonthlySalesDetails(Year, Searchtxt, Advance, City);
    }
}

function BindCity_Dropdown(id) {
    $.ajax(
        {
            url: 'AddOrder.aspx/BindCityDetails',
            type: 'GET',
            datatype: 'json',
            contentType: "application/json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    $('#' + id).html('');
                    $('#' + id).append('<option value="">Select</option>');
                    $.each(data.Headers, function (i, row) {
                        $('#' + id).append('<option value="' + row.CCOde + '">' + row.CValue + '</option>');
                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                //$("#preloader").hide();
            }
        });
}

function BindCustomerCode_Dropdown() {
    try {
        var CityCode = $("#ddl_LastPurchase_City").val();
        var Input =
        {
            'CityCode': CityCode
        }
        $.ajax(
            {
                url: 'AddOrder.aspx/BindCustomerCode',
                data: JSON.stringify(Input),
                type: 'POST',
                datatype: 'json',
                contentType: "application/json",
                success: function (result) {
                    if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                        var data = JSON.parse(result.d);

                        $('#ddl_LastPurchase_CustomerCode').html('');
                        $('#ddl_LastPurchase_CustomerCode').append('<option value="Select">Select</option>');
                        $.each(data.Headers, function (i, row) {
                            $('#ddl_LastPurchase_CustomerCode').append('<option value="' + row.CCode + '">' + row.CName + '</option>');
                        });
                    }
                },
                error: function (jqXHR, textStatus, err) {
                    //$("#preloader").hide();
                }
            });
    } catch (e) {
        console.log(e.message);
    }

}

function AddPayment(PurchaseCode, PageIndex) {

    sessionStorage.setItem("PurchaseCode", PurchaseCode);

    window.location.href = "../UI/AddPayment.aspx";
}


function UpdateInvoiceShared(OrderCode) {
    try {
        var input = {
            'OrderCode': OrderCode
        }

        $.ajax({
            type: "POST",
            url: "StockReport.aspx/BindInvoiceShared",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {
                        MessageCenter(data.Headers, "green");
                        $("#Share_" + OrderCode).removeClass('hidden');
                    }

                }

            }
        });
    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}