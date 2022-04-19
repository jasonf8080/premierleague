const loader = document.querySelector('.loader-container');

export const showLoader = () => {
    loader.classList.add('active')
}

export const hideLoader = () => {
    loader.classList.remove('active')
}