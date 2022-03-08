const elmContainer = document.querySelector('.container');
const elmBanks = document.querySelector('.banks');
const modal = document.querySelector('.modal');

/* ===== RENDER ===== */
function RenderBanks(banks = []) {
    let htmlBanks = '';
    banks.forEach(bank => {
        let classShowModal = (bank.hasOwnProperty('fastTransfer') && bank.fastTransfer) ? 'btn-show-modal' : '';
        htmlBanks += `
						<div class="bank">
							<img src="${bank.logo}" class="bank-logo">
							<div class="bank-info">
								<p class="bank-name">${bank.name}</p>
								<p class="bank-number">STK: ${bank.number}</p>
								<p class="bank-owner">CTK: ${bank.owner}</p>
							</div>
							<span class="btn-copy ${classShowModal}" data-number="${bank.number}">Copy</span>
						</div>
					`;
    });
    elmBanks.innerHTML = htmlBanks;
}

/* ===== EVENT ===== */
function CopyEvent() {
    const elmCopies = document.querySelectorAll('.btn-copy');
    elmCopies.forEach(btn => {
        btn.addEventListener('click', e => {
            elmCopies.forEach(elm => elm.textContent = 'Copy');
            let number = btn.getAttribute('data-number');
            let temp = document.createElement('textarea');
            temp.value = number;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            btn.textContent = 'Copied';
        });
    })
}

function MouseLeaveEvent() {
    const elmBank = document.querySelectorAll('.bank');
    elmBank.forEach(bank => {
        bank.addEventListener('mouseleave', e => {
            let btn = bank.querySelector('.btn-copy');
            btn.textContent = 'Copy';
        });
    });
}

function ShowModalEvent() {
    const elmShowModals = document.querySelectorAll('.btn-show-modal');
    elmShowModals.forEach(btn =>
        btn.addEventListener('click', e => {
            let number = btn.getAttribute('data-number');
            ShowModal(number);
            btn.textContent = 'Copied';
        })
    );
}

/* ===== MODAL ===== */
function ShowModal(number = 123456789) {
    modal.classList.add('active');
    elmContainer.classList.add('blur');
    modal.querySelector('#transfer').addEventListener('click', e => {
        let link = 'https://nhantien.momo.vn/' + number;
        let newWindow = window.open(link, '_blank');
        modal.querySelector('#dismiss').click();
        setTimeout(() => {
            newWindow.close();
        }, 2000)
    });
}

function CloseModalEvent() {
    modal.querySelector('#dismiss').addEventListener('click', e => {
        modal.classList.remove('active');
        elmContainer.classList.remove('blur');
    });
}