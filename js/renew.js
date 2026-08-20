(function () {
    const STEP_INQUIRY = 1;
    const STEP_MEMBER = 2;
    const STEP_PHONE = 3;
    const STEP_VERIFY = 4;
    const STEP_PAYMENT = 5;
    const STEP_CONFIRM = 6;
    const ALL_STEPS = [STEP_INQUIRY, STEP_MEMBER, STEP_PHONE, STEP_VERIFY, STEP_PAYMENT, STEP_CONFIRM];

    const PAYMENT_FEES = {
        card: 27,
        fawry: 52
    };

    const PAYMENT_SUBTOTAL = 1610;

    const STEP_TITLE_KEYS = {
        1: { key: "inquireDetails", fallback: "الاستعلام عن تفاصيل العضو" },
        2: { key: "stepMemberData", fallback: "بيانات العضو" },
        3: { key: "phoneConfirmTitle", fallback: "تأكيد رقم الهاتف للعضو" },
        4: { key: "enterVerifyCode", fallback: "أدخل رمز التحقق" },
        5: { key: "paymentTitle", fallback: "سداد الاشتراك" },
        6: { key: "confirmTitle", fallback: "تأكيد العملية" }
    };

    const CARD_NUMBER_X = 0.42;
    const CARD_NUMBER_Y = 0.72;

    const MOCK_ORDER = {
        number: "021525A5182",
        fawryCode: "8363728282",
        fawryDeadline: "20/8/2026"
    };

    const MOCK_MEMBER = {
        number: "015656",
        name: "يوسف احمد عبد الحميد",
        expiryDate: "30/06/2026",
        grandTotal: "1610.000",
        phone: "0102*****21",
        otpPhone: "010****1234",
        email: "rwr******@gmail.com"
    };

    const STRINGS = {
        ar: {
            inquireDetails: "الاستعلام عن تفاصيل العضو",
            stepMemberData: "بيانات العضو",
            phoneConfirmTitle: "تأكيد رقم الهاتف للعضو",
            enterVerifyCode: "أدخل رمز التحقق",
            paymentTitle: "سداد الاشتراك",
            confirmTitle: "تأكيد العملية",
            membershipCheck: "يرجى التأكد من رقم العضوية",
            membershipEndedOn: "انتهت العضوية",
            selectPaymentMethod: "يرجى اختيار طريقة الدفع",
            copyFawryDone: "تم نسخ الكود",
            fawryPayBefore: "ادفع طلبك باستخدام كود فورى قبل يوم"
        },
        en: {
            inquireDetails: "Inquire about member details",
            stepMemberData: "Member data",
            phoneConfirmTitle: "Confirm member phone number",
            enterVerifyCode: "Enter verification code",
            paymentTitle: "Subscription payment",
            confirmTitle: "Confirmation",
            membershipCheck: "Please check the membership number",
            membershipEndedOn: "Membership ended",
            selectPaymentMethod: "Please select a payment method",
            copyFawryDone: "Code copied",
            fawryPayBefore: "Pay your order using the Fawry code before"
        }
    };

    function t(key, fallback) {
        const lang = document.documentElement.lang === "en" ? "en" : "ar";
        return (STRINGS[lang] && STRINGS[lang][key]) || fallback;
    }

    function setRenewProgress(currentStep) {
        const items = document.querySelectorAll(".renew_membership .progress-item");
        const lines = document.querySelectorAll(".renew_membership .progress-line");

        if (!items.length) return;

        items.forEach(function (item) {
            const stepNumber = Number(item.getAttribute("data-step"));
            const step = item.querySelector(".progress-step");

            item.classList.remove("completed", "current");
            if (step) step.classList.remove("completed", "current");

            if (stepNumber < currentStep) {
                item.classList.add("completed");
                if (step) step.classList.add("completed");
            } else if (stepNumber === currentStep) {
                item.classList.add("current");
                if (step) step.classList.add("current");
            }
        });

        lines.forEach(function (line, index) {
            const lineStep = index + 1;
            line.classList.toggle("active", lineStep < currentStep);
        });
    }

    window.setProgress = setRenewProgress;

    function buildArrowHead(x, y, angle, size) {
        const left = angle + Math.PI * 0.78;
        const right = angle - Math.PI * 0.78;

        const x1 = x + Math.cos(left) * size;
        const y1 = y + Math.sin(left) * size;
        const x2 = x + Math.cos(right) * size;
        const y2 = y + Math.sin(right) * size;

        return (
            "M " +
            x1.toFixed(1) +
            " " +
            y1.toFixed(1) +
            " L " +
            x.toFixed(1) +
            " " +
            y.toFixed(1) +
            " L " +
            x2.toFixed(1) +
            " " +
            y2.toFixed(1)
        );
    }

    function updateRenewArrow() {
        const panel1 = document.getElementById("renewPanel1");
        const card = document.querySelector(".renew_membership .renew-card");
        const image = document.getElementById("renewCardImage");
        const input = document.getElementById("membershipNumber");
        const arrow = document.getElementById("renewArrow");
        const svg = document.getElementById("renewArrowSvg");
        const path = document.getElementById("renewArrowPath");
        const head = document.getElementById("renewArrowHead");

        if (!card || !image || !input || !arrow || !svg || !path || !head) return;

        if ((panel1 && panel1.hidden) || window.matchMedia("(max-width: 768px)").matches) {
            arrow.style.display = "none";
            return;
        }

        arrow.style.display = "block";

        const cardRect = card.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();

        if (!cardRect.width || !imageRect.width || !inputRect.width) return;

        const highlight = document.querySelector(".renew_membership .renew-number-highlight");
        const highlightRect = highlight ? highlight.getBoundingClientRect() : null;
        const useHighlight = highlightRect && highlightRect.width > 0 && highlightRect.height > 0;
        const startRect = useHighlight ? highlightRect : imageRect;
        const startX = useHighlight
            ? startRect.left - cardRect.left + startRect.width / 2
            : imageRect.left - cardRect.left + imageRect.width * CARD_NUMBER_X;
        const startY = useHighlight
            ? startRect.top - cardRect.top + startRect.height / 2
            : imageRect.top - cardRect.top + imageRect.height * CARD_NUMBER_Y;

        const endX = inputRect.left - cardRect.left + inputRect.width / 2;
        const endY = inputRect.top - cardRect.top + inputRect.height / 2;

        const width = Math.max(cardRect.width, 1);
        const height = Math.max(cardRect.height, 1);

        svg.setAttribute("viewBox", "0 0 " + width + " " + height);
        svg.setAttribute("width", String(width));
        svg.setAttribute("height", String(height));

        const dx = endX - startX;
        const dy = endY - startY;
        const ctrl1X = startX + dx * 0.15;
        const ctrl1Y = startY + Math.max(dy * 0.35, 28);
        const ctrl2X = startX + dx * 0.55;
        const ctrl2Y = endY - Math.min(Math.abs(dy) * 0.15, 18);

        path.setAttribute(
            "d",
            "M " +
                startX.toFixed(1) +
                " " +
                startY.toFixed(1) +
                " C " +
                ctrl1X.toFixed(1) +
                " " +
                ctrl1Y.toFixed(1) +
                ", " +
                ctrl2X.toFixed(1) +
                " " +
                ctrl2Y.toFixed(1) +
                ", " +
                endX.toFixed(1) +
                " " +
                endY.toFixed(1)
        );

        const angle = Math.atan2(endY - ctrl2Y, endX - ctrl2X);
        head.setAttribute("d", buildArrowHead(endX, endY, angle, 10));
    }

    function isKnownMembershipNumber(value) {
        return value === MOCK_MEMBER.number;
    }

    function formatMoney(amount) {
        return (
            amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + " ج.م"
        );
    }

    function fillMemberData(membershipNumber) {
        const nameEl = document.getElementById("memberName");
        const numberEl = document.getElementById("memberNumber");
        const expiryEl = document.getElementById("memberExpiryDate");
        const totalEl = document.getElementById("memberGrandTotal");
        const phoneEl = document.getElementById("memberPhoneMasked");
        const emailEl = document.getElementById("memberEmailMasked");

        if (nameEl) nameEl.textContent = MOCK_MEMBER.name;
        if (numberEl) numberEl.textContent = membershipNumber;
        if (expiryEl) {
            expiryEl.textContent = t("membershipEndedOn", "انتهت العضوية") + ": " + MOCK_MEMBER.expiryDate;
        }
        if (totalEl) totalEl.textContent = MOCK_MEMBER.grandTotal;
        if (phoneEl) phoneEl.textContent = MOCK_MEMBER.phone;
        if (emailEl) emailEl.textContent = MOCK_MEMBER.email;

        const paymentName = document.getElementById("paymentMemberName");
        const paymentNumber = document.getElementById("paymentMemberNumber");
        const paymentPreviewTotal = document.getElementById("paymentPreviewTotal");

        if (paymentName) paymentName.textContent = MOCK_MEMBER.name;
        if (paymentNumber) paymentNumber.textContent = membershipNumber;
        if (paymentPreviewTotal) paymentPreviewTotal.textContent = MOCK_MEMBER.grandTotal;

        updateOtpPhoneDisplays();
    }

    function updateOtpPhoneDisplays() {
        const sentPhone = document.getElementById("otpSentPhone");
        const instructionPhone = document.getElementById("otpInstructionPhone");

        if (sentPhone) sentPhone.textContent = MOCK_MEMBER.otpPhone;
        if (instructionPhone) instructionPhone.textContent = MOCK_MEMBER.otpPhone;
    }

    function updateStepTitle(step) {
        const title = document.getElementById("renewStepTitle");
        const config = STEP_TITLE_KEYS[step];

        if (!title) return;

        if (step === STEP_CONFIRM) {
            title.hidden = true;
            return;
        }

        title.hidden = false;

        if (!config) return;

        title.setAttribute("data-i18n", config.key);
        title.textContent = t(config.key, config.fallback);
    }

    function getSelectedPaymentMethod() {
        const selected = document.querySelector('.renew-payment-method input[type="radio"]:checked');
        return selected ? selected.value : null;
    }

    function fillConfirmData() {
        const successOrder = document.getElementById("successOrderNumber");
        const pendingOrder = document.getElementById("pendingOrderNumber");
        const fawryCode = document.getElementById("fawryCodeValue");
        const fawryDeadline = document.getElementById("fawryDeadlineText");

        if (successOrder) successOrder.textContent = MOCK_ORDER.number;
        if (pendingOrder) pendingOrder.textContent = MOCK_ORDER.number;
        if (fawryCode) fawryCode.textContent = MOCK_ORDER.fawryCode;

        if (fawryDeadline) {
            fawryDeadline.textContent =
                t("fawryPayBefore", "ادفع طلبك باستخدام كود فورى قبل يوم") + " " + MOCK_ORDER.fawryDeadline;
        }
    }

    function showConfirmView(methodValue) {
        const successView = document.getElementById("renewConfirmSuccess");
        const pendingView = document.getElementById("renewConfirmPending");

        if (methodValue === "fawry") {
            if (successView) successView.hidden = true;
            if (pendingView) pendingView.hidden = false;
        } else {
            if (pendingView) pendingView.hidden = true;
            if (successView) successView.hidden = false;
        }

        fillConfirmData();
    }

    function copyFawryCode() {
        const codeEl = document.getElementById("fawryCodeValue");
        const copyBtn = document.getElementById("renewCopyFawryBtn");
        const code = codeEl ? codeEl.textContent.trim() : MOCK_ORDER.fawryCode;

        function markCopied() {
            if (!copyBtn) return;
            const original = copyBtn.textContent;
            copyBtn.textContent = t("copyFawryDone", "تم نسخ الكود");
            window.setTimeout(function () {
                copyBtn.textContent = original;
            }, 1800);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(markCopied).catch(function () {
                markCopied();
            });
            return;
        }

        const temp = document.createElement("textarea");
        temp.value = code;
        temp.setAttribute("readonly", "");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            /* ignore */
        }
        document.body.removeChild(temp);
        markCopied();
    }

    function goToStep(step) {
        ALL_STEPS.forEach(function (panelStep) {
            const panel = document.getElementById("renewPanel" + panelStep);

            if (!panel) return;

            panel.hidden = step !== panelStep;
            panel.classList.toggle("is-active", step === panelStep);
        });

        updateStepTitle(step);
        setRenewProgress(step);

        if (step === STEP_INQUIRY) {
            window.requestAnimationFrame(updateRenewArrow);
        }

        if (step === STEP_VERIFY) {
            const firstDigit = document.querySelector(".renew-otp-digit");
            if (firstDigit) {
                window.requestAnimationFrame(function () {
                    firstDigit.focus();
                });
            }
        }

        if (step === STEP_PAYMENT) {
            resetPaymentSelection();
        }
    }

    function resetPaymentSelection() {
        const methods = document.querySelectorAll(".renew-payment-method");
        const breakdown = document.getElementById("paymentBreakdown");

        methods.forEach(function (method) {
            method.classList.remove("is-selected");
            const radio = method.querySelector('input[type="radio"]');
            const details = method.querySelector(".renew-payment-details");

            if (radio) radio.checked = false;
            if (details) details.hidden = true;
        });

        if (breakdown) breakdown.hidden = true;
    }

    function selectPaymentMethod(methodValue) {
        const methods = document.querySelectorAll(".renew-payment-method");
        const breakdown = document.getElementById("paymentBreakdown");
        let selectedMethod = null;

        methods.forEach(function (method) {
            const radio = method.querySelector('input[type="radio"]');
            const details = method.querySelector(".renew-payment-details");
            const isMatch = method.getAttribute("data-method") === methodValue;

            method.classList.toggle("is-selected", isMatch);
            if (radio) radio.checked = isMatch;
            if (details) details.hidden = !isMatch;

            if (isMatch) selectedMethod = method;
        });

        if (!selectedMethod) return;

        if (breakdown) breakdown.hidden = false;
        updatePaymentBreakdown(methodValue);
    }

    function updatePaymentBreakdown(methodValue) {
        const fee = PAYMENT_FEES[methodValue] || 0;
        const total = PAYMENT_SUBTOTAL + fee;
        const subtotalEl = document.getElementById("paymentSubtotal");
        const feeEl = document.getElementById("paymentServiceFee");
        const totalEl = document.getElementById("paymentGrandTotal");

        if (subtotalEl) subtotalEl.textContent = formatMoney(PAYMENT_SUBTOTAL);
        if (feeEl) feeEl.textContent = formatMoney(fee);
        if (totalEl) totalEl.textContent = formatMoney(total);
    }

    function initPaymentMethods() {
        const methods = document.querySelectorAll(".renew-payment-method");

        methods.forEach(function (method) {
            const radio = method.querySelector('input[type="radio"]');
            const head = method.querySelector(".renew-payment-method-head");

            if (!radio || !head) return;

            head.addEventListener("click", function (event) {
                if (event.target.tagName === "INPUT") return;
                radio.checked = true;
                selectPaymentMethod(method.getAttribute("data-method"));
            });

            radio.addEventListener("change", function () {
                if (!radio.checked) return;
                selectPaymentMethod(method.getAttribute("data-method"));
            });
        });
    }

    function initCardNumberInput() {
        const input = document.getElementById("cardNumber");

        if (!input) return;

        function formatCardNumber(value) {
            const digits = String(value || "").replace(/\D/g, "").slice(0, 16);
            return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
        }

        function setCaretToEnd() {
            const length = input.value.length;
            input.setSelectionRange(length, length);
        }

        input.addEventListener("input", function () {
            const formatted = formatCardNumber(input.value);
            input.value = formatted;
            setCaretToEnd();
        });

        input.addEventListener("keydown", function (event) {
            if (event.key !== "Backspace" || input.selectionStart !== input.selectionEnd) return;

            const caret = input.selectionStart;
            if (caret > 0 && input.value.charAt(caret - 1) === " ") {
                event.preventDefault();
                const nextValue = input.value.slice(0, caret - 2) + input.value.slice(caret);
                input.value = formatCardNumber(nextValue);
                const nextCaret = Math.max(caret - 2, 0);
                input.setSelectionRange(nextCaret, nextCaret);
            }
        });

        input.addEventListener("paste", function (event) {
            event.preventDefault();
            const pasted = (event.clipboardData || window.clipboardData).getData("text");
            input.value = formatCardNumber(pasted);
            setCaretToEnd();
        });

        input.addEventListener("focus", setCaretToEnd);
    }

    function initOtpMethods() {
        const methods = document.querySelectorAll(".renew-otp-method");

        methods.forEach(function (method) {
            const input = method.querySelector('input[type="radio"]');

            if (!input) return;

            input.addEventListener("change", function () {
                methods.forEach(function (item) {
                    const radio = item.querySelector('input[type="radio"]');
                    item.classList.toggle("is-selected", !!(radio && radio.checked));
                });
            });
        });
    }

    function initOtpDigits() {
        const digits = document.querySelectorAll(".renew-otp-digit");

        digits.forEach(function (digit, index) {
            digit.setAttribute("placeholder", "-");

            digit.addEventListener("input", function () {
                const value = String(digit.value || "").replace(/\D/g, "");
                digit.value = value.slice(-1);

                if (digit.value && digits[index + 1]) {
                    digits[index + 1].focus();
                }
            });

            digit.addEventListener("keydown", function (event) {
                if (event.key === "Backspace" && !digit.value && digits[index - 1]) {
                    digits[index - 1].focus();
                }
            });

            digit.addEventListener("paste", function (event) {
                event.preventDefault();
                const pasted = (event.clipboardData || window.clipboardData)
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, digits.length);

                pasted.split("").forEach(function (char, charIndex) {
                    if (digits[charIndex]) digits[charIndex].value = char;
                });

                const focusIndex = Math.min(pasted.length, digits.length - 1);
                if (digits[focusIndex]) digits[focusIndex].focus();
            });
        });
    }

    function clearOtpDigits() {
        document.querySelectorAll(".renew-otp-digit").forEach(function (digit) {
            digit.value = "";
        });
    }

    function initRenewInquiry() {
        const form = document.getElementById("renewInquiryForm");
        const input = document.getElementById("membershipNumber");
        const error = document.getElementById("membershipError");
        const image = document.getElementById("renewCardImage");
        const backBtn = document.getElementById("renewBackBtn");
        const nextBtn = document.getElementById("renewNextBtn");
        const phoneBackBtn = document.getElementById("renewPhoneBackBtn");
        const sendCodeBtn = document.getElementById("renewSendCodeBtn");
        const verifyBackBtn = document.getElementById("renewVerifyBackBtn");
        const verifyNextBtn = document.getElementById("renewVerifyNextBtn");
        const resendBtn = document.getElementById("renewResendBtn");
        const paymentBackBtn = document.getElementById("renewPaymentBackBtn");
        const payBtn = document.getElementById("renewPayBtn");
        const printReceiptBtn = document.getElementById("renewPrintReceiptBtn");
        const homeSuccessBtn = document.getElementById("renewHomeSuccessBtn");
        const homePendingBtn = document.getElementById("renewHomePendingBtn");
        const copyFawryBtn = document.getElementById("renewCopyFawryBtn");

        if (!form || !input) return;

        goToStep(STEP_INQUIRY);
        initOtpMethods();
        initOtpDigits();
        initPaymentMethods();
        initCardNumberInput();
        updateOtpPhoneDisplays();

        function scheduleArrowUpdate() {
            window.requestAnimationFrame(updateRenewArrow);
        }

        scheduleArrowUpdate();

        if (image) {
            if (image.complete) {
                scheduleArrowUpdate();
            } else {
                image.addEventListener("load", scheduleArrowUpdate);
            }
        }

        window.addEventListener("resize", scheduleArrowUpdate);

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(scheduleArrowUpdate);
        }

        function showMembershipError() {
            if (error) error.hidden = false;
            input.focus();
            scheduleArrowUpdate();
        }

        function hideMembershipError() {
            if (error) error.hidden = true;
            scheduleArrowUpdate();
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const value = String(input.value || "").trim();

            if (!isKnownMembershipNumber(value)) {
                showMembershipError();
                return;
            }

            hideMembershipError();
            fillMemberData(value);
            goToStep(STEP_MEMBER);
        });

        input.addEventListener("input", function () {
            if (!error || error.hidden) return;
            hideMembershipError();
        });

        if (backBtn) {
            backBtn.addEventListener("click", function () {
                hideMembershipError();
                goToStep(STEP_INQUIRY);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                goToStep(STEP_PHONE);
            });
        }

        if (phoneBackBtn) {
            phoneBackBtn.addEventListener("click", function () {
                goToStep(STEP_MEMBER);
            });
        }

        if (sendCodeBtn) {
            sendCodeBtn.addEventListener("click", function () {
                clearOtpDigits();
                goToStep(STEP_VERIFY);
            });
        }

        if (verifyBackBtn) {
            verifyBackBtn.addEventListener("click", function () {
                goToStep(STEP_PHONE);
            });
        }

        if (verifyNextBtn) {
            verifyNextBtn.addEventListener("click", function () {
                goToStep(STEP_PAYMENT);
            });
        }

        if (paymentBackBtn) {
            paymentBackBtn.addEventListener("click", function () {
                goToStep(STEP_VERIFY);
            });
        }

        if (payBtn) {
            payBtn.addEventListener("click", function () {
                const method = getSelectedPaymentMethod();

                if (!method) {
                    window.alert(t("selectPaymentMethod", "يرجى اختيار طريقة الدفع"));
                    return;
                }

                showConfirmView(method);
                goToStep(STEP_CONFIRM);
            });
        }

        if (printReceiptBtn) {
            printReceiptBtn.addEventListener("click", function () {
                window.print();
            });
        }

        [homeSuccessBtn, homePendingBtn].forEach(function (btn) {
            if (!btn) return;
            btn.addEventListener("click", function () {
                window.location.href = "index.html";
            });
        });

        if (copyFawryBtn) {
            copyFawryBtn.addEventListener("click", copyFawryCode);
        }

        if (resendBtn) {
            resendBtn.addEventListener("click", function () {
                clearOtpDigits();
                const firstDigit = document.querySelector(".renew-otp-digit");
                if (firstDigit) firstDigit.focus();
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRenewInquiry);
    } else {
        initRenewInquiry();
    }
})();
