var srno = 0;
var FinalSum = 0;
var TotalVolume = 0;
EntityType = 'Lobby';

$(document).ready(function () {

    //BindStockCode_Dropdown();
    BindCity_Dropdown();
    BindProductDetails_Dropdown();
    BindTaxDetails_Dropdown();



    //$("#txt_BasePrice").change(function () {
    //    try {
    //        var Unit = $("#txt_Volume").val();
    //        var BasePrice = $(this).val();

    //        var ddlProducCode = $("#ddl_ProductDetails").val();
    //        var ProductVariation = 1;
    //        if (ddlProducCode == "PROD0919005") ProductVariation = 4; //5 Litre Can
    //        if (ddlProducCode == "PROD0919006") ProductVariation = 8; //2 Litre Bottle
    //        if (ddlProducCode == "PROD0919007") ProductVariation = 12; //1 Litre Pouch
    //        if (ddlProducCode == "PROD09190010") ProductVariation = 12; //1 Litre Bottle
    //        if (ddlProducCode == "PROD0919009") ProductVariation = 18; //200 MilliLitre Pouch
    //        if (ddlProducCode == "PROD08190010") ProductVariation = 12; //1/2 Liter Pouch


    //        var Total = parseFloat((ProductVariation * Unit) * BasePrice).toFixed(2);
    //        $("#txt_totalAmount").val(Total);
    //        $("#ddl_TaxDetails option").eq(3).prop('selected', true);
    //        var TaxCode = $("#ddl_TaxDetails").val();
    //        LoadTaxDetail(TaxCode);

    //    } catch (e) {
    //        console.log(e.message);
    //    }
    //});

    $("#ddl_TaxDetails").change(function () {
        try {
            var TaxCode = $("#ddl_TaxDetails").val();

            LoadTaxDetail(TaxCode);

        } catch (e) {
            $("#preloader").hide();
        }
    });


    function LoadTaxDetail(TaxCode) {
        var input = {
            'TaxCode': TaxCode
        }
        //$("#preloader").show();
        $.ajax({
            type: "POST",
            url: "AddOrder.aspx/GetTaxDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    $("#txt_TaxPercentage").val(data.Headers[0].Tvalue);
                    var TotalAmt = $("#txt_totalAmount").val();

                    var TaxableAmt = parseFloat((TotalAmt * data.Headers[0].Tvalue) / 100).toFixed(2);
                    $("#txt_TotalTaxable_Amt").val(TaxableAmt);
                    var FinalAmt = parseFloat(parseFloat(TotalAmt) + parseFloat(TaxableAmt));
                    $("#txt_FinalAmt").val(parseFloat(FinalAmt).toFixed(2));
                    $("#preloader").hide();
                }
            }
        });
    }

    $("#btn_Add").click(function () {
        try {

            $("#preloader").show();

            var City = $("#ddl_City").val();
            var CustmerCode = $("#ddl_CustomerCode").val();
            var CustmerName = $("#ddl_CustomerCode option:selected").text();
            var WorkerName = $("#txt_WorkerName").val();
            var ProductCode = $("#ddl_ProductDetails").val();
            var ProductName = $("#ddl_ProductDetails option:selected").text();
            var Volume = $("#txt_Volume").val();
            var BasePrice = $("#txt_BasePrice").val();
            var TotalAmount = $("#txt_totalAmount").val();
            var TaxCode = $("#ddl_TaxDetails").val();
            var TaxName = $("#ddl_TaxDetails option:selected").text();

            var TaxPercentage = $("#txt_TaxPercentage").val();
            var TotalTaxable_Amt = $("#txt_TotalTaxable_Amt").val();
            var FinalAmt = $("#txt_FinalAmt").val();
            var PurchaseCode = $("#hdn_PurchaseCode").val();

            var IsValidate = true;


            if (City == "" || City == "Select") {
                $("#ddl_City").focus();
                MessageCenter("Please Select City.", "red");
                IsValidate = false;
                return false;
            }
            if (CustmerCode == "" || CustmerCode == "Select") {
                $("#ddl_CustomerCode").focus();
                MessageCenter("Please Select Customer Code.", "red");
                IsValidate = false;
                return false;
            }
            if (WorkerName == "") {
                $("#txt_WorkerName").focus();
                MessageCenter("Please Enter Worker Name.", "red");
                IsValidate = false;
                return false;
            }

            if (ProductCode == "" || ProductCode == "Select") {
                $("#ddl_ProductDetails").focus();
                MessageCenter("Please Select Product Code.", "red");
                IsValidate = false;
                return false;
            }
            if (Volume == "") {
                $("#txt_Volume").focus();
                MessageCenter("Please Enter Volume.", "red");
                IsValidate = false;
                return false;
            }
            if (BasePrice == "") {
                $("#txt_BasePrice").focus();
                MessageCenter("Please Enter Base Price.", "red");
                IsValidate = false;
                return false;
            }

            if (IsValidate) {


                if (PurchaseCode == '' && PurchaseCode == undefined) PurchaseCode = '';

                $("#table_PurchaseDetails,#btn_Submit").removeClass('hidden');

                $("#ddl_City,#ddl_CustomerCode,#txt_WorkerName,#txt_PurchaseDate").addClass('notClean');
                $("#ddl_City,#ddl_CustomerCode,#txt_WorkerName,#txt_PurchaseDate").attr('readonly', true);
                srno++;
                FinalSum = parseFloat(parseFloat(FinalSum) + parseFloat(FinalAmt)).toFixed(2);
                TotalVolume = parseFloat(parseFloat(TotalVolume) + parseFloat(Volume)).toFixed(2);
                var hdn_pendingLineItemCode = $("#hdn_PendingCodeLineItem").val();
                var _html = "";
                _html += "<tr id='tr_" + srno + "'>";
                _html += "<td class='Center'>" + srno + "</td>";
                _html += "<td class='Center hidden'>" + ProductCode + "</td>";
                _html += "<td class='Center'>" + ProductName + "</td>";
                _html += "<td class='Center'>" + parseFloat(Volume).toFixed(2) + "</td>";
                _html += "<td class='Center'><b>&#8377;</b>" + parseFloat(BasePrice).toFixed(2) + "</td>";
                _html += "<td class='Center'><b>&#8377;</b>" + parseFloat(TotalAmount).toFixed(2) + "</td>";
                _html += "<td class='Center hidden'>" + TaxCode + "</td>";
                _html += "<td class='Center hidden'>" + TaxName + "</td>";
                _html += "<td class='Center'>" + TaxPercentage + "</td>";
                _html += "<td class='Center'><b>&#8377;</b>" + parseFloat(TotalTaxable_Amt).toFixed(2) + "</td>";
                _html += "<td class='Center' id='FinamAmt_" + srno + "'><b>&#8377;</b>" + parseFloat(FinalAmt).toFixed(2) + "</td>";
                _html += "<td class='Center hidden'>" + hdn_pendingLineItemCode + "</td>";
                _html += "<td class='Center'><a class='btn btn-red btn-sm Edit' onclick='EditOrder(" + srno + ")' style='cursor:pointer;'><span class='glyphicon glyphicon-edit'></span></a></td>";
                _html += "<td class='Center'><a class='btn btn-red btn-sm Delete' onclick='Delete(" + srno + ")' style='cursor:pointer;'><span class='glyphicon glyphicon-trash'></span></a></td>";
                _html += "</tr>";

                $("#tfooter_PurchaseDetails").html('');
                $("#tfooter_PurchaseDetails").html("<tr><td colspan='2'></td><td style='text-align:center;'><div style='margin-right:2%;' id='div_TotalVolume'>" + TotalVolume + "</td><td colspan='4'></td><td><div style='text-align:center;'> Total: <b> &#8377;</b><span id='div_TotalFinalSum'>" + FinalSum + "</span></div></td><td colspan='2'></td></tr>");
                $("#tbody_PurchaseDetails").append(_html);
                $(window).scrollTop();
                $("#preloader").hide();

                Reset();
                $("#ddl_ProductDetails").val("Select");
            }
        } catch (e) {

            $("#preloader").hide();
        }
    });

    LoadCalandar();

    $(".maxcount").keyup(function () {
        var text = $(this).val();
        if (text.length >= 3) {
            return false;
        }
    });

    $("#txt_BasePrice").keyup(function () {
        try {

            var Unit = $("#txt_Volume").val();
            if (Unit != null && Unit != undefined) {
                var BasePrice = $(this).val();

                var ddlProducCode = $("#ddl_ProductDetails").val();
                var ProductVariation = 1;
                if (ddlProducCode == "PROD0919005") ProductVariation = 4; //5 Litre Can
                if (ddlProducCode == "PROD0919006") ProductVariation = 8; //2 Litre Bottle
                if (ddlProducCode == "PROD0919007") ProductVariation = 12; //1 Litre Pouch
                if (ddlProducCode == "PROD09190010") ProductVariation = 12; //1 Litre Bottle
                if (ddlProducCode == "PROD0919009") ProductVariation = 18; //200 MilliLitre Pouch
                if (ddlProducCode == "PROD08190010") ProductVariation = 12; //1/2 Liter Pouch
                if (ddlProducCode == "PROD02200011") ProductVariation = 4; //5 Liter Bucket

                if (BasePrice != '' && BasePrice != undefined) {
                    var Total = parseFloat((ProductVariation * Unit) * BasePrice).toFixed(2);
                    $("#txt_totalAmount").val(Total);
                    $("#ddl_TaxDetails option").eq(3).prop('selected', true);
                    var TaxCode = $("#ddl_TaxDetails").val();
                    LoadTaxDetail(TaxCode);
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    });

    $("#txt_Volume").keyup(function () {
        try {

            var BasePrice = $("#txt_BasePrice").val();
            if (BasePrice != null && BasePrice != undefined) {
                var Unit = $(this).val();

                if (Unit != '' && Unit != undefined) {
                    var Multiply = (parseFloat(BasePrice) * parseFloat(Unit)).toFixed(2);
                    $("#txt_totalAmount").val(Multiply);
                    $("#ddl_TaxDetails option").eq(3).prop('selected', true);
                    var TaxCode = $("#ddl_TaxDetails").val();
                    LoadTaxDetail(TaxCode);
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    });

});

function BindStockCode_Dropdown() {
    $.ajax(
        {
            url: 'AddOrder.aspx/BindStockCode',
            type: 'GET',
            datatype: 'json',
            contentType: "application/json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    $('#ddl_StockCode').html('');
                    $('#ddl_StockCode').append('<option value="Select">Select</option>');
                    $.each(data.Headers, function (i, row) {
                        $('#ddl_StockCode').append('<option value="' + row.StockCode + '">' + row.StockCode + '</option>');
                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                //$("#preloader").hide();
            }
        });
}

function BindCity_Dropdown() {
    $.ajax(
        {
            url: 'AddOrder.aspx/BindCityDetails',
            type: 'GET',
            datatype: 'json',
            contentType: "application/json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    $('#ddl_City').html('');
                    $('#ddl_City').append('<option value="Select">Select</option>');
                    $.each(data.Headers, function (i, row) {
                        $('#ddl_City').append('<option value="' + row.CCOde + '">' + row.CValue + '</option>');
                    });

                    var PendingOrdCode = sessionStorage.getItem("PendingOrdCode");
                    if (PendingOrdCode != "" && PendingOrdCode != undefined) {
                        GetPendingOrderDetails(PendingOrdCode); sessionStorage.removeItem("PendingOrdCode")
                    }
                    var OrderCode = sessionStorage.getItem("OrderCode");
                    if (OrderCode != "" && OrderCode != undefined) {
                        GetOrderDetails(OrderCode); sessionStorage.removeItem("OrderCode")
                    }
                }
            },
            error: function (jqXHR, textStatus, err) {
                //$("#preloader").hide();
            }
        });
}

function BindCustomerCode_Dropdown() {
    try {
        var CityCode = $("#ddl_City").val();
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

                        $('#ddl_CustomerCode').html('');
                        $('#ddl_CustomerCode').append('<option value="Select">Select</option>');
                        $.each(data.Headers, function (i, row) {
                            $('#ddl_CustomerCode').append('<option value="' + row.CCode + '">' + row.CName + '</option>');
                        });

                        var CustomerCode = sessionStorage.getItem("CustomerCode");
                        if (CustomerCode != "" && CustomerCode != undefined) {
                            $('#ddl_CustomerCode').val(CustomerCode);
                            sessionStorage.removeItem("CustomerCode")
                        }

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

function BindProductDetails_Dropdown() {
    $.ajax(
        {
            url: 'AddOrder.aspx/BindProductDetails',
            type: 'GET',
            datatype: 'json',
            contentType: "application/json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    $('#ddl_ProductDetails').html('');
                    $('#ddl_ProductDetails').append('<option value="Select">Select</option>');
                    $.each(data.Headers, function (i, row) {
                        $('#ddl_ProductDetails').append('<option value="' + row.PCode + '">' + row.PName + '</option>');
                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                //$("#preloader").hide();
            }
        });
}

function BindTaxDetails_Dropdown() {
    $.ajax(
        {
            url: 'AddOrder.aspx/GetAllTaxDetails',
            type: 'GET',
            datatype: 'json',
            contentType: "application/json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    $('#ddl_TaxDetails').html('');
                    $('#ddl_TaxDetails').append('<option value="Select">Select</option>');
                    $.each(data.Headers, function (i, row) {
                        $('#ddl_TaxDetails').append('<option value="' + row.TCode + '">' + row.TName + '</option>');
                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                //$("#preloader").hide();
            }
        });
}


function Clean() {

}

function Delete(srno) {
    try {
        var TotalUnit = $("#div_TotalVolume").text();
        var DeleteDAmt = $("#FinamAmt_" + srno).text().replace('₹', '');

        FinalSum = parseFloat(FinalSum) - parseFloat(DeleteDAmt);

        $("#div_TotalFinalSum,#div_TotalVolume").html('');

        $('#tr_' + srno).each(function () {
            var currentRow = $(this);
            var Volume = (currentRow.find("td:eq(3)").text());
            TotalUnit = (parseFloat(TotalUnit) - parseFloat(Volume));
        });

        //console.log(TotalUnit);

        $("#div_TotalVolume").text(parseFloat(TotalUnit).toFixed(2));
        $("#div_TotalFinalSum").html(parseFloat(FinalSum).toFixed(2));

        $("#tr_" + srno).remove();
    } catch (e) {
        console.log(e.message);
    }
}

function SubmitPurchaseDetails() {
    try {

        var WorkerName = $("#txt_WorkerName").val();

        if (WorkerName == "") {
            $("#txt_WorkerName").focus();
            MessageCenter("Please Enter Worker Name.", "red");
            return false;
        }

        var IsSubmit = confirm("Are you Sure you want to Submit Order Details.?");

        if (IsSubmit) {

            $("#preloader").show();

            var City = $("#ddl_City").val();
            var CustmerCode = $("#ddl_CustomerCode").val();
            var CustmerName = $("#ddl_CustomerCode option:selected").text();

            var PurchaseDate = $('#hdn_date').val();
            var WorkerName = $("#txt_WorkerName").val();

            var PurchaseCode = $("#hdn_PurchaseCode").val();

            if (PurchaseCode == '' || PurchaseCode == undefined) PurchaseCode = '';

            var xml = '<?xml version="1.0" encoding="utf-16"?><rows>';
            var BillAmount = $("#div_TotalFinalSum").text();
            // loop over each table row (tr)
            $("#tbody_PurchaseDetails tr").each(function () {
                var currentRow = $(this);
                //var PurchaseCode = $("#hdn_PurchaseCode").val();
                var srno = currentRow.find("td:eq(0)").text();
                var ProductCode = currentRow.find("td:eq(1)").text();
                var ProductName = currentRow.find("td:eq(2)").text();
                var Volume = currentRow.find("td:eq(3)").text();
                var BasePrice = currentRow.find("td:eq(4)").text().replace('₹', '');
                var TotalAmount = currentRow.find("td:eq(5)").text().replace('₹', '');
                var TaxCode = currentRow.find("td:eq(6)").text();
                var TaxName = currentRow.find("td:eq(7)").text();
                var TaxPercentage = currentRow.find("td:eq(8)").text();
                var TotalTaxable_Amt = currentRow.find("td:eq(9)").text().replace('₹', '');
                var FinalAmt = currentRow.find("td:eq(10)").text().replace('₹', '');
                var PurchaseLineItemCode = currentRow.find("td:eq(11)").text();

                //BillAmount = parseFloat(parseFloat(BillAmount) + parseFloat(FinalAmt)).toFixed(2);
                console.log(BillAmount);
                xml += '<row>';

                xml += '<f_SrNo><![CDATA[' + srno + ']]></f_SrNo>';
                xml += '<f_PurchaseCode><![CDATA[' + PurchaseCode + ']]></f_PurchaseCode>';
                xml += '<City><![CDATA[' + City + ']]></City>';
                xml += '<f_PurchaseLineItemCode><![CDATA[' + PurchaseLineItemCode + ']]></f_PurchaseLineItemCode>';
                xml += '<f_CustomerCode><![CDATA[' + $.trim(CustmerCode) + ']]></f_CustomerCode>';
                xml += '<f_CustomerName><![CDATA[' + $.trim(CustmerName) + ']]></f_CustomerName>';
                xml += '<f_PurchaseDate><![CDATA[' + $.trim(PurchaseDate) + ']]></f_PurchaseDate>';
                xml += '<f_WorkerName><![CDATA[' + $.trim(WorkerName) + ']]></f_WorkerName>';
                xml += '<f_ProductCode><![CDATA[' + $.trim(ProductCode) + ']]></f_ProductCode>';
                xml += '<f_ProductName><![CDATA[' + $.trim(ProductName) + ']]></f_ProductName>';
                xml += '<f_Volume><![CDATA[' + $.trim(Volume) + ']]></f_Volume>';
                xml += '<f_BasePrice><![CDATA[' + $.trim(BasePrice) + ']]></f_BasePrice>';
                xml += '<f_TotalAmount><![CDATA[' + $.trim(TotalAmount) + ']]></f_TotalAmount>';
                xml += '<f_TaxCode><![CDATA[' + $.trim(TaxCode) + ']]></f_TaxCode>';
                xml += '<f_TaxName><![CDATA[' + $.trim(TaxName) + ']]></f_TaxName>';
                xml += '<f_TaxPercentage><![CDATA[' + $.trim(TaxPercentage) + ']]></f_TaxPercentage>';
                xml += '<f_TotalTaxableAmount><![CDATA[' + $.trim(TotalTaxable_Amt) + ']]></f_TotalTaxableAmount>';
                xml += '<f_FinalAmount><![CDATA[' + $.trim(FinalAmt) + ']]></f_FinalAmount>';
                xml += '<f_BillAmount><![CDATA[' + (parseFloat(BillAmount)) + ']]></f_BillAmount>';
                xml += '</row>';

            });

            xml += " </rows>";

            console.log(xml);
            $("#btn_Submit,#btn_Add,.Edit,.Delete").attr("disabled", "disabled");

            var Input = {
                'xmlData': xml,
                'PurchaseCode': PurchaseCode

            }
            $("#ddl_City,#ddl_CustomerCode,#txt_WorkerName,#txt_PurchaseDate").removeClass('notClean');

            $.ajax({
                type: "POST",
                url: "AddOrder.aspx/InsertPurchaseDetails_XML",
                data: JSON.stringify(Input),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                        var data = JSON.parse(result.d);

                        var OrderCode = data.OrderCode;
                        $("#hdn_OrderCode").val(OrderCode);
                        $("#Lnk_Print").removeClass('hidden');
                        $('#lblErrormsg').css("color", "green");
                        $('#lblErrormsg').html(data.Headers);

                        $("#preloader").hide();
                        $(".clean").val('');
                        $(window).scrollTop(0);
                        $("#btn_Submit,#btn_Add,.Edit,.Delete").attr("disabled", false);
                        $("#ddl_City,#ddl_CustomerCode,#txt_WorkerName,#txt_PurchaseDate").removeClass('notClean');
                        $("#ddl_City,#ddl_CustomerCode,#txt_WorkerName,#txt_PurchaseDate").attr('readonly', false);
                        $("#ddl_City,#ddl_CustomerCode").val('Select');
                        $("#txt_WorkerName,#txt_PurchaseDate").val('');
                        $("#tbody_PurchaseDetails,#tfooter_PurchaseDetails").html('');
                        $("#hdn_date").val('');
                        $("#table_PurchaseDetails,#btn_Submit").addClass('hidden');
                        Reset();
                    }
                    $("#preloader").hide();
                }

            });
        }
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}

function LoadCalandar() {
    $(function () {
        var currentDate = new Date();
        var nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 14);

        var fullDate = new Date()
        //Thu May 19 2011 17:25:38 GMT+1000 {}

        //convert month to 2 digits
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

        var TodayDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        //alert(TodayDate);
        //19/05/2011
        //$("#txt_ComplianceDate").val(TodayDate);
        //alert(currentDate);
        //twoDigitMonth = '04';
        if (twoDigitMonth == '01' || twoDigitMonth == '02' || twoDigitMonth == '03') {
            currentDate = "01" + "/" + "04" + "/" + (fullDate.getFullYear() - 1);

        }
        else {
            currentDate = "01" + "/" + "04" + "/" + fullDate.getFullYear();
            //alert(currentDate);
        }
        $("#txt_PurchaseDate").datepicker({
            altField: "#alternate",
            altFormat: "DD, MM, yy",
            autoclose: true,
            //startDate: currentDate,
            endDate: TodayDate,
            format: 'dd/mm/yyyy',
            //todayBtn: "linked",
            todayHighlight: true
            //,clearBtn: true
        }).on('changeDate', function (e) {
            var selectedDate = $(this).val();
            var dae = selectedDate.split('/');
            FinalDate = dae[2] + "-" + dae[1] + "-" + dae[0];
            var formatedMysqlString = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(12, 19).replace('T', ' ');
            $('#hdn_date').val(FinalDate + ' ' + formatedMysqlString);
        });

        //$('#txt_PurchaseDate').val(TodayDate);
        //$('#txt_PaymentRecivedDate').datepicker('update', TodayDate);
    });
}

function EditOrder(srno) {

    $('#tr_' + srno).each(function () {
        var currentRow = $(this);
        var ProductDetails = (currentRow.find("td:eq(1)").text());
        var Volume = (currentRow.find("td:eq(3)").text());
        var BasePrice = (currentRow.find("td:eq(4)").text().replace('₹', ''));
        var totalAmount = (currentRow.find("td:eq(5)").text().replace('₹', ''));
        var TaxDetails = (currentRow.find("td:eq(6)").text());

        var PendingCodeLineItem = (currentRow.find("td:eq(11)").text());
        console.log(PendingCodeLineItem);
        $("#ddl_ProductDetails").val(ProductDetails);
        $("#txt_Volume").val(Volume);
        $("#txt_BasePrice").val(BasePrice);
        $("#txt_totalAmount").val(totalAmount);
        $("#ddl_TaxDetails").val(TaxDetails);
        $("#hdn_PendingCodeLineItem").val(PendingCodeLineItem);

        FinalSum = $("#div_TotalFinalSum").text();
        FinalSum = parseFloat(FinalSum) - parseFloat(totalAmount);
        $("#div_TotalFinalSum").text(FinalSum);

        TotalVolume = $("#div_TotalVolume").text();
        TotalVolume = (parseFloat(TotalVolume) - parseFloat(Volume)).toFixed(2);
        $("#div_TotalVolume").text(TotalVolume);

        $("#btn_AddWorker").text("Update");

    });
    $('#tr_' + srno).remove();
}

function GetPendingOrderDetails(PendingOrdCode) {
    try {
        MessageCenter('', "green");
        var input = {
            'PendingOrdCode': PendingOrdCode
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "AddOrder.aspx/GetPendingOrderon_AddOrder",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Table != '' && data.Table != '[]') {
                        BindDataToGrid(data);

                        //$("#ddl_CustomerCode").val(data.Headers[0].CustomerCode);
                    }
                }
                $("#preloader").hide();
            }
        });
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}


function BindDataToGrid(data) {
    var _html = ""; var FinalAmt = 0;
    $("#ddl_City").val(data.Headers[0].CustomerCity);
    sessionStorage.setItem("CustomerCode", data.Headers[0].CustomerCode);
    BindCustomerCode_Dropdown();

    $("#txt_WorkerName").val(data.Headers[0].WorkerName);

    $("#tbody_StockDetails").html('');

    $.each(data.Headers1, function (key, item) {
        //item.EmailId = "ASHAPURA123ENTERPRISES@GMAIL.COM";

        $("#table_PurchaseDetails,#btn_Submit").removeClass('hidden');

        $("#ddl_City,#ddl_CustomerCode").addClass('notClean');
        $("#ddl_City,#ddl_CustomerCode").attr('readonly', true);
        srno++;
        FinalSum = parseFloat(parseFloat(FinalSum) + parseFloat(item.TotalAmout)).toFixed(2);
        TotalVolume = parseFloat(parseFloat(TotalVolume) + parseFloat(item.Volume)).toFixed(2);

        var _html = "";
        _html += "<tr id='tr_" + srno + "'>";
        _html += "<td class='Center'>" + srno + "</td>";
        _html += "<td class='Center hidden'>" + item.ProductCode + "</td>";
        _html += "<td class='Center'>" + item.ProductName + "</td>";
        _html += "<td class='Center'>" + parseFloat(item.Volume).toFixed(2) + "</td>";
        _html += "<td class='Center'><b>&#8377;</b>" + parseFloat(item.BasePrice).toFixed(2) + "</td>";
        _html += "<td class='Center'><b>&#8377;</b>" + parseFloat(item.TotalAmout).toFixed(2) + "</td>";
        _html += "<td class='Center hidden'></td>";
        _html += "<td class='Center hidden'></td>";
        _html += "<td class='Center'>0</td>";
        _html += "<td class='Center'><b>&#8377;</b>0.00</td>";
        _html += "<td class='Center' id='FinamAmt_" + srno + "'><b>&#8377;</b>" + parseFloat(item.TotalAmout).toFixed(2) + "</td>";
        _html += "<td class='Center hidden'>" + item.PurchaseLineItemCode + "</td>";

        _html += "<td class='Center'><a class='btn btn-red btn-sm Edit' onclick='EditOrder(" + srno + ")' style='cursor:pointer;'><span class='glyphicon glyphicon-edit'></span></a></td>";
        _html += "<td class='Center'><a class='btn btn-red btn-sm Delete' onclick='Delete(" + srno + ")' style='cursor:pointer;'><span class='glyphicon glyphicon-trash'></span></a></td>";
        _html += "</tr>";

        $("#tfooter_PurchaseDetails").html('');
        $("#tfooter_PurchaseDetails").html("<tr><td colspan='2'></td><td style='text-align:center;'><div style='margin-right:2%;' id='div_TotalVolume'>" + TotalVolume + "</td><td colspan='4'></td><td><div style='text-align:center;'> Total: <b> &#8377;</b><span id='div_TotalFinalSum'>" + FinalSum + "</span></div></td><td colspan='2'></td></tr>");


        $("#tbody_PurchaseDetails").append(_html);
    });
    if (data.Headers2 != null && data.Headers2 != "") {
        $("#txt_PurchaseDate,#hdn_date").val(data.Headers2[0].CreatedDate);
    }
}

function GetOrderDetails(OrdCode) {
    try {
        MessageCenter('', "green");
        var input = {
            'OrdCode': OrdCode
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "AddOrder.aspx/GetUpdateOrderon_AddOrder",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    if (data.Table != '' && data.Table != '[]') {
                        BindDataToGrid(data);
                        $("#hdn_PurchaseCode").val(OrdCode);
                        //$("#ddl_CustomerCode").val(data.Headers[0].CustomerCode);
                    }
                }
                $("#preloader").hide();
            }
        });
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}