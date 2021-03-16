EntityType = 'Sale';
var srNo = 1;
$(document).ready(function () {

    var PurchaseCode = sessionStorage.getItem('PurchaseCode');


    if (PurchaseCode != null && PurchaseCode != undefined && PurchaseCode != "") {
        SearchPurchaseDetails_PurchaseCode(PurchaseCode);
        sessionStorage.removeItem('PurchaseCode');
    }
    else {
        LoadAllPaymentDetails(1, '');
    }
    LoadCalandar();



});


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
        $("#txt_PaymentRecivedDate").datepicker({
            altField: "#alternate",
            altFormat: "DD, MM, yy",
            autoclose: true,
            startDate: currentDate,
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

        //$('#txt_PaymentRecivedDate').val(TodayDate);
        //$('#txt_PaymentRecivedDate').datepicker('update', TodayDate);
    });
}

function SearchPurchaseDetails() {
    var PurchaseCode = $("#txt_search").val();
    $("#Div_LoadPaymentDetails").addClass("hidden");
    SearchPurchaseDetails_PurchaseCode(PurchaseCode);

}

function LoadPaymentByPaymentId(PurchaseCode) {
    $("#Div_LoadPaymentDetails").addClass("hidden");
    SearchPurchaseDetails_PurchaseCode(PurchaseCode);

}

function SearchPurchaseDetails_PurchaseCode(PurchaseCode) {
    try {

        var input = {
            'PurchaseCode': PurchaseCode,
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "AddPayment.aspx/GetPurchaseDetailsBy_PurchaseCode",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);
                    if (data.Headers != '' && data.Headers != '[]') {
                        var _html = null;
                        $("#table_PurchaseDetails,#div_AddPayment,#div_PaymentDetails").removeClass('hidden');
                        $("#tbody_PurchaseDetails,#tfoot_PurchaseDetails").html('');

                        srNo = 1;
                        var SumFinalAmt = 0;
                        var TotalUnit = 0;

                        $("#txt_PurchaseCode").val(data.Headers[0].PurchaseCode);

                        $("#div_PurchaseCode").html("<span style='cursor:pointer;color:#337ab7' onclick=loadOrderDetails(&#39;" + data.Headers[0].PurchaseCode + "&#39;)>" + data.Headers[0].PurchaseCode + "</span>");

                        $("#div_CustomerName").html("<span style='cursor:pointer;color:#337ab7;' onclick='OpenCustomerDetails(&#39;" + data.Headers[0].CustomerCode + "&#39;)'>" + data.Headers[0].CustomerName + "</span>");

                        $("#div_CustomerCode").text(data.Headers[0].CustomerCode);

                        $("#div_TotalAmount").html("<span><b> &#8377;</b></span> " + parseFloat(data.Headers[0].TotalAmount).toFixed(2));
                        $("#div_SoldBy").text(data.Headers[0].SoldBy);
                        $("#div_PurchaseDate").text(data.Headers[0].PurchaseDate);
                        $("#div_paymentPaid").text(data.IsPaymenPaid);

                        $("#div_Payment_Date").text(data.Headers[0].Payment_Date);
                        $("#div_AmountRecivedBy").text(data.Headers[0].Payment_RecivedBy);
                        $("#div_AmountRecived_Type").text(data.Headers[0].Payment_RecivedBy);

                        $("#hdn_Payment_Code").val(data.Headers[0].PaymentCode);

                        $.each(data.Headers1, function (key, item) {
                            SumFinalAmt = (parseFloat(SumFinalAmt) + parseFloat(item.FinalAmt)).toFixed(2);
                            TotalUnit = (parseFloat(TotalUnit) + parseFloat(item.Unit));
                            _html += "<tr>";
                            _html += "<td class='Center'>" + srNo + "</td>";
                            _html += "<td class='Center'>" + item.ProductName + "</td>";
                            _html += "<td class='Center'>" + parseFloat(item.Unit).toFixed(2); + "</td>";
                            _html += "<td class='Center'><span><b> &#8377;</b></span> " + parseFloat(item.BasePrice).toFixed(2) + "</td>";
                            _html += "<td class='Center'><span><b> &#8377;</b></span> " + parseFloat(item.TotalAmount).toFixed(2) + "</td>";
                            _html += "<td class='Center'>" + item.TaxPercentage + "% (" + item.TaxName + ")</td>";
                            _html += "<td class='Center'><span><b> &#8377;</b></span> " + parseFloat(item.TotalTaxableAmt).toFixed(2) + "</td>";
                            _html += "<td class='Center'><span><b> &#8377;</b></span> " + parseFloat(item.FinalAmt).toFixed(2) + "</td>";
                            _html += "</tr>";
                            srNo = srNo + 1;
                        });

                        $("#div_RemainingAmt").text((parseFloat(SumFinalAmt) - parseFloat(data.Headers[0].AmountPaid)).toFixed(2));

                        var IsPaymentpaid = data.IsPaymenPaid;

                        if (IsPaymentpaid)
                            $("#div_AddPayment").addClass("hidden");
                        else
                            $("#div_AddPayment").removeClass('hidden');

                        $("#tfoot_PurchaseDetails").append("<tr><td colspan='3' style='text-align:right;padding-right:10px;'><b>Total :</b> " + parseFloat(TotalUnit).toFixed(2) + "</td> <td colspan='5' style='text-align:right;padding-right:25px;'><b>Total:</b><span><b> &#8377;</b></span> " + SumFinalAmt + "</td></tr>");
                        $("#tbody_PurchaseDetails").append(_html);
                        $("#preloader").hide();
                    }

                }
                else {
                    $("#tbody_PurchaseDetails").html('');
                    $("#tbody_PurchaseDetails").append("<tr><td colspan='14' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
                    $("#preloader").hide();
                }
            }
        });
    } catch (e) {
        console.log(e.Message);
        $("#preloader").hide();
    }
}


function AddPaymentDetails() {
    try {
        var PurchaseCode = $("#div_PurchaseCode").text();
        var CustomerCode = $("#div_CustomerCode").text();
        var CustomerName = $("#div_CustomerName").text();
        var TotalAmount = $("#div_TotalAmount").text().replace('₹', '');

        var PurchaseDate = $("#div_PurchaseDate").text();
        var PaymentPaid = $("#txt_PaymentPaid").val();
        var PaymentRecivedBy = $("#txt_WorkerName").val();
        var PaymentType = $("#ddl_PaymentType").val();
        var PaymentRecivedDate = $("#hdn_date").val();
        var Remarks = $("#txt_Remarks").val();
        var Payment_Code = $("#hdn_Payment_Code").val();



        var IsValidate = true;

        if (PurchaseCode == "" || PurchaseCode == "Select") {
            $("#txt_PurchaseCode").focus();
            MessageCenter("Please Enter Purchase Code.", "red");
            IsValidate = false;
            return false;
        }
        if (PaymentPaid == "" || PaymentPaid == "Select") {
            $("#txt_PaymentPaid").focus();
            MessageCenter("Please Enter Payment Paid.", "red");
            IsValidate = false;
            return false;
        }
        if (PaymentRecivedBy == "" || PaymentRecivedBy == "Select") {
            $("#txt_WorkerName").focus();
            MessageCenter("Please Enter Payment RecivedBy.", "red");
            IsValidate = false;
            return false;
        }
        if (PaymentType == "" || PaymentType == "Select") {
            $("#ddl_PaymentType").focus();
            MessageCenter("Please Select Payment Type.", "red");
            IsValidate = false;
            return false;
        }

        if (Remarks == "" || Remarks == "Select") {
            $("#txt_Remarks").focus();
            MessageCenter("Please Enter Remarks.", "red");
            IsValidate = false;
            return false;
        }

        if (IsValidate) {
            $("#lnk_Submit").attr("disabled", "disabled");
            var input = {
                'Payment_Code': Payment_Code,
                'PurchaseCode': PurchaseCode,
                'CustomerCode': CustomerCode,
                'CustomerName': CustomerName,
                'TotalAmount': TotalAmount,
                'PurchaseDate': PurchaseDate,
                'PaymentPaid': PaymentPaid,
                'PaymentRecivedBy': PaymentRecivedBy,
                'PaymentType': PaymentType,
                'PaymentRecivedDate': PaymentRecivedDate,
                'Remarks': Remarks
            }
            $("#preloader").show();

            $.ajax({
                type: "POST",
                url: "AddPayment.aspx/AddPaymentDetails",
                data: JSON.stringify(input),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                        var data = JSON.parse(result.d);

                        if (data.Headers != '' && data.Headers != '[]') {
                            $("#div_AddCustomer").addClass('hidden');
                            var msg = data.Headers;
                            if (msg.indexOf("Successfully") > 0) {
                                MessageCenter(data.Headers, "green");
                                Reset();
                            }
                            else {
                                $("#lnk_Submit").attr("disabled", false);
                                MessageCenter(data.Headers, "red");
                            }

                            $(window).scrollTop(0);
                        }
                        $("#preloader").hide();
                    }
                    else {
                        $("#tbody_PurchaseDetails").html('');
                        $("#tbody_PurchaseDetails").append("<tr><td colspan='9' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
                        $("#tfoot_PurchaseDetails").html('');
                        $("#preloader").hide();
                    }
                }
            });
        }
    } catch (e) {
        console.log(e.message);
        $("#preloader").hide();
    }
}


function CheckEnterPress(e) {
    if (e.which == 13) {
        SearchPurchaseDetails();
    }
}

function ShowPaymentDiv() {
    $("#div_SearchPayment").removeClass("hidden");
}

function LoadAllPaymentDetails(PageIndex, SearchBy) {
    try {
        MessageCenter('', "green");
        var input = {
            'PageIndex': PageIndex,
            'SearchBy': SearchBy
        }
        $("#preloader").show();
        $.ajax({
            type: "POST",
            url: "AddPayment.aspx/GetPaymentDetails",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null && result != '' && result.d != null && result.d != '' && result.d != '0' && result.d != '-1') {
                    var data = JSON.parse(result.d);

                    var totalRowsCount = data.TotalCount;
                    $("#Div_LoadPaymentDetails").removeClass("hidden");
                    if (totalRowsCount > 0) {

                        var totalPageCount = (parseFloat)(totalRowsCount / 100);

                        var splitstg = totalPageCount.toString().split(".");

                        totalPageCount = splitstg[0];
                        var additionalCount = splitstg[1];

                        //$("#table_tfooter").html('');
                        BindPaginationData(totalPageCount, totalRowsCount, additionalCount, PageIndex);
                        if (data.Table != '' && data.Table != '[]') {
                            var _html = null;
                            $("#tbody_PaymentDetails").html('');

                            $.each(data.Headers, function (key, item) {

                                _html += "<tr class='tabrow_" + item.Id + "' id='tablerow_" + item.Id + "' >";
                                _html += "<td class='Center'>" + srNo + "</td>";
                                _html += "<td class='Center hidden'><a href='../UI/OrderDetails.aspx?id=" + item.PurchaseCode + "&type=Stocks'>" + item.PaymentCode + "</a></td > ";
                                _html += "<td class='Center'><span style='cursor:pointer;color:#337ab7' onclick=loadOrderDetails(&#39;" + item.PurchaseCode + "&#39;)>" + item.CustomerName + "</span></td>";
                                _html += "<td class='Center'>" + item.PurchaseCode + "</td>";
                                _html += "<td class='Center'>" + item.PurchaseDate + "</td>";
                                _html += "<td class='Center'><span><b> &#8377; </b>" + parseFloat(item.TotalAmount) + "</span> </td>";
                                _html += "<td class='Center'><span><b> &#8377; </b>" + parseFloat(item.AmountPaid) + "</span> </td>";

                                _html += "<td class='Center'>" + item.AmountRecivedBy + "</td>";
                                _html += "<td class='Center'>" + item.AmountRecived_Type + "</td>";
                                _html += "<td class='Center'>" + item.CreatedDate + "</td>";
                                _html += "<td class='Center'>" + item.PaymentCreationDate + "</td>";

                                _html += "</tr>";
                                srNo = srNo + 1;
                            });

                            $("#tbody_PaymentDetails").append(_html);

                            $('.tyty').animate({
                                scrollTop: $(".tyty").offset().top - 500
                            }, 1);
                        }
                        $("#preloader").hide();
                    }
                    else {
                        $("#tbody_PaymentDetails").html('');
                        $("#tbody_PaymentDetails").append("<tr><td colspan='9' style='width:100%;text-align:left;'>No Result Found for search Criteria " + SearchBy + "</td></tr>");
                        $("#table_tfooter").html('');
                        $("#preloader").hide();
                    }
                }
                else {

                } $("#preloader").hide();
            }
        });
    } catch (e) {
        console.log(e.message);
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
                    _Pageing += "<li class='pageing page-item " + cssclass + "' id='td_Pageing_" + i.toString() + "' onclick='Callfunction(" + i + ")'><a class='page-link'onclick='Callfunction(" + totalPageCount + 1 + ")' >" + i.toString() + "</a></li>";
                }

                if (additionalCount != "" && additionalCount != undefined && additionalCount != 0) {

                    totalPageCount = parseInt(totalPageCount) + 1;
                    _Pageing += "<li class='pageing page-item' id='td_Pageing_" + i.toString() + "'><a class='page-link' onclick='Callfunction(" + totalPageCount + ")' >" + totalPageCount + "</a></li>";
                }

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

    LoadAllPaymentDetails(pageNo, '');

}
