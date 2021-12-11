let isCVMode = false;
const CVElements = [...document.getElementsByClassName("cv")]
const MePicElement = document.getElementById("me")

function toggleCVMode() {
    if (isCVMode) {
        CVElements.forEach(e => e.style.display = "none")
        me.src = "./me.jpg"
    } else {
        CVElements.forEach(e => e.style.display = "block")
        me.src = "./me2.jpg"
    }
    isCVMode = !isCVMode
}