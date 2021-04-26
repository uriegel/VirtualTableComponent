import './VirtualTableComponent.js'

const themeChooser = document.getElementById("themeChooser")
const changeCols = document.getElementById("changeCols")
const table = document.querySelector('virtual-table-component')

themeChooser.onchange = () => {
    const changeTheme = theme => {
        ["themeBlue", "themeAdwaita", "themeAdwaitaDark"].forEach(n => {
            document.body.classList.remove(n)    
            table.classList.remove(n)    
        })
        document.body.classList.add(theme)    
        const style = getComputedStyle(document.body)
        exifColor = style.getPropertyValue('--exif-color') 
        table.classList.add(theme)    
        table.themeChanged()
    }

    switch (themeChooser.selectedIndex) {
        case 0: 
            changeTheme("themeBlue")
            break
        case 1: 
            changeTheme("themeAdwaita")
            break
        case 2: 
            changeTheme("themeAdwaitaDark")
        break
    }
}

const widthstr = localStorage.getItem("widths")
const widths = widthstr ? JSON.parse(widthstr) : []
let columns = [{
    name: "Name",
    isSortable: true,
    render: (td, item) => td.innerHTML = item.name
}, {
    name: "Ext.",
    render: (td, item) => td.innerHTML = item.ext
}, {
    name: "Datum",
    isSortable: true,
    render: (td, item) => {
        td.innerHTML = item.date
        td.style.color = exifColor
    }
}, {
    name: "Größe",
    isSortable: true,
    isRightAligned: true,
    render: (td, item) => {
        td.innerHTML = item.size
        td.classList.add("rightAligned")
    }
}]
if (widths)
    columns = columns.map((n, i)=> ({ ...n, width: widths[i]}))
    
table.setColumns(columns)
const items = Array.from(Array(40).keys())
    .map(index => ({
        name: "Eintrag " + index,
        ext: "ext",
        date: "24.03.1999 14:23",
        size: 2344 + index
    }))
table.setItems(items)

var saveWidths = true
table.addEventListener("columnwidths", e => {
    if (saveWidths) 
        localStorage.setItem("widths", JSON.stringify(e.detail))
})
table.addEventListener("columclick", e => {
    console.log("columclick", e.detail)
})

changeCols.addEventListener("click", () => {
    saveWidths = false
    table.setColumns([{
        name: "Name",
        isSortable: true,
        subItem: {
            name: "Ext.",
            isSortable: true
        }
    }, {
        name: "Datum", 
        isSortable: true
    }, {
        name: "Art"
    }])

})

var exifColor

// TODO: icon view in first column
// TODO: icon view as svg in first column
// TODO: CurrentPosition
// TODO: changing currentIndex with scrolling 
// TODO: Selection, control in host
// TODO: Restriction 


