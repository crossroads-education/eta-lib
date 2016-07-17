import * as eta from "../../index";

export class HelperNavbar {
    public static build(data : any, permissions : string[], baseurl : string, isSubmenu : boolean) : string {
        let html : string = "";
        let pastFirst : boolean = false;
        for (let name in data) {
            if (name == "permission") {
                continue;
            }
            if (data[name].permission && permissions.indexOf(data[name].permission) === -1) {
                continue; // skip when permissions aren't there
            }
            if (data[name].url) { // just a link
                html += `<li><a href="${baseurl}${data[name].url}">${name}</a></li>\n`;
                continue;
            }
            if (isSubmenu) {
                if (pastFirst) {
                    html += `<li class="divider" role="separator"></li>\n`;
                }
                html += `<li class="dropdown-header">${name}</li>\n`;
            } else { // root dropdowns
                html += `
                    <li class="dropdown">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown"
                            role="button" aria-haspopup="true" aria-expanded="false">
                            ${name}
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                `;
            }
            html += HelperNavbar.build(data[name], permissions, baseurl, true);
            if (!isSubmenu) {
                html += "</ul>\n</li>";
            }
            pastFirst = true;
        }
        return html;
    }
}