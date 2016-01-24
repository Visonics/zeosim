// Copyright (c) 2016 and beyond, Farrukh Shahzad, PhD and Sohel Shaikh, PhD
// All rights reserved.

// Redistribution in source and binary forms, with or without modification, are  NOT permitted.

// Free for educational and researh Use. Any commercial use requires copyright holder's permission and royality agreement. 


// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS 
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS 
// OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Sample was Copyright 1998-2015 by Northwoods Software Corporation.

    Jmol._isAsync = false;

    var jmolApplet0;
    var gView = "best";
    var name = "MFI.cif {3 3 1}";
    var nDel_O = 0;
    var nDel_T = 0;
    var mesopores = [];
    var mesopore_id = 0;
    var structure_dimensions = {};
    var calls = 0;
    var logged = false;
    var lastPrompt = 0;

    jmol_isReady = function (applet) {
        document.title = "JS-Zeolite - FS/SS 2016";
        Jmol._getElement(applet, "appletdiv").style.border = "1px solid blue";
        show_mesopores();
    };

    var Info = {
        width: "100%",
        height: "100%",
        debug: false,
        color: "0xFFFFFF",
        //addSelectionOptions: true,
        use: "Java",   // JAVA HTML5 WEBGL are all options
        j2sPath: "./resources/j2s", // this needs to point to where the j2s directory is.
        jarPath: "./resources/java",// this needs to point to where the java directory is.
        jarFile: "JmolAppletSigned0.jar",
        isSigned: true,
        script: "set LoadStructCallback 'file_loaded'; set EchoCallback 'NONE';set measurementUnits ANGSTROMS; load data/MFI.cif {3 3 1}; set antialiasImages ON; set statusReporting OFF; rm={};unitcell OFF;ndT=0;set showBoundBox TRUE; ndO=0;set echo top;font echo 18 bold ;color echo red ; echo " + name,
        serverURL:  "http://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",  // "php/jsmol.php"
        readyFunction: jmol_isReady,
        disableJ2SLoadMonitor: true,
        disableInitialConsole: true,
        allowJavaScript: true,
        memoryLimit: 512
        //console: "console_infodiv", // default will be jmolApplet0_infodiv, but you can designate another div here or "none"
        //defaultModel: "$dopamine",
    }

function get_browser_info(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

$(document).ready(function () {

	changeApp(true);
	
    document.getElementById("fw").value = "MFI.cif";
    document.getElementById("sym").value = "{3 3 1}";
})

function changeApp(detect)
{	
	   
	bw = get_browser_info();
	
	Info.script= "set LoadStructCallback 'file_loaded'; set EchoCallback 'NONE';set measurementUnits ANGSTROMS; load data/" + name + "; set antialiasImages ON; set statusReporting OFF; rm={};unitcell OFF;ndT=0;set showBoundBox TRUE; ndO=0;set echo top;font echo 18 bold ;color echo red ; echo " + name;
	if (detect==true) {
		if (!(bw['name'].match("Firefox|IE")))
			Info.use = "HTML5";
		$("#appdiv").html(Jmol.getAppletHtml("jmolApplet0", Info));
	} else {
	 if (confirm("Existing work will be lost! Are you sure?") == true) {	
		if (Info.use == "HTML5")
			Info.use = "Java";
		else
			Info.use = "HTML5";
		$("#appdiv").html(Jmol.getAppletHtml("jmolApplet0", Info));
		setup();
	 }	
	}
		
	document.getElementById("browser").value = bw['name'] +"-"+bw['version']+" "+Info.use;	
}

function about() {

//<p>Citation: <span class="notranslate">Baerlocher, C. and McCusker, L. Database of Zeolite Structures. <a href="http://www.iza-structure.org/databases/" target="_blank">http://www.iza-structure.org/databases/</a>, 2013.</span> Accessed on April 23, 2013. <a href="http://izasc.ethz.ch/fmi/xsl/IZA-SC/ftc_fw.xsl?-db=Atlas_main&-lay=fw&-max=25&STC=MFI&-find" target="_blank">Framework Type <span class="notranslate">MFI</span></a> (Material: <span class="notranslate">ZSM-5</span>)</p>
//<p class="notranslate">First, E. L., Gounaris, C. E., Wei, J., and Floudas, C. A. <a href="http://dx.doi.org/10.1039/c1cp21731c" target="_blank">Computational characterization of zeolite porous networks: an automated approach</a>. <em>Physical Chemistry Chemical Physics</em>, 13(38):17339&#8211;17358, 2011.</p>

}

function reset_controls() {

}

function getFilename(dname) {
    var fname = prompt("Please enter filename", dname);
    return fname;
}

function setup() {
    nDel_T = 0;
    nDel_O = 0;
    mesopores = [];
    mesopore_id = 0;
    Jmol.script(jmolApplet0, 'unitcell OFF; center visible; zoom 100;spacefill ionic; spacefill 25%;');
    Jmol.script(jmolApplet0, "set echo top;font echo 18 bold ;color echo red ; echo " + name + ";");
    control(name);
}

function control() {

    spin = document.getElementById("spin").checked;
    view = document.getElementById("view").value;
    if (view == "Show All") {
        Jmol.script(jmolApplet0, 'animation FPS 2; capture "faces-' + name.split('.')[0] + '.gif" LOOP 0;echo Top;moveto 0 top; delay 1.0; echo Bottom;moveto 0 bottom; delay 1.0; echo Front;moveto 0 front; delay 1.0; echo Back; moveto 0 back; delay 1.0;echo Right;moveto 0 right; delay 1.0;echo Left;moveto 0 left; delay 1.0;echo ' + name + ';');
        view = "best";
        gView = "";
        document.getElementById("view").value = view;
    }

    if (view != gView) {
        if (view == "best")
            Jmol.script(jmolApplet0, 'rotate best;capture END;');
        else
            Jmol.script(jmolApplet0, 'moveto 0 ' + view);
        gView = view;
    }
    if (document.getElementById("background").checked)
        Jmol.script(jmolApplet0, 'background black');
    else
        Jmol.script(jmolApplet0, 'background white');

    if (document.getElementById("edit").checked)
        Jmol.script(jmolApplet0, 'set picking DELETEATOM; set PickCallback none; console');
    else
        Jmol.script(jmolApplet0, 'set modelkitmode false;set picking ident;set PickCallback none');

    if (document.getElementById("label").checked)
        Jmol.script(jmolApplet0, 'select *;label %a');
    else
        Jmol.script(jmolApplet0, 'select *;label off');

    if (document.getElementById("antialias").checked)
        Jmol.script(jmolApplet0, 'set antialiasDisplay;');
    else
        Jmol.script(jmolApplet0, 'set antialiasDisplay off;');

    if (spin)
        Jmol.script(jmolApplet0, 'rotate 90; spin on');
    else
        Jmol.script(jmolApplet0, 'spin off');

}


function ChangeFW() {
    if (confirm("Existing work will be lost! Are you sure?") == true) {
        sym = document.getElementById("sym").value;
        data = document.getElementById("fw").value;
        Jmol.script(jmolApplet0, "reset ALL;set EchoCallback 'NONE';ndT=0; ndO=0;rm={}; set LoadStructCallback 'file_loaded';load ASYNC 'data/" + data + "' " + sym);
        name = data + " " + sym;
        setup();
    }
}

function LoadFW(file) {
    if (confirm("Existing work will be lost! Are you sure?") == true) {
        sym = document.getElementById("sym").value;
        Jmol.script(jmolApplet0, 'reset ALL;set EchoCallback "NONE";rm={};set LoadStructCallback "file_loaded";load ? ' + sym);
        name = "External Data " + sym;
        setup();
    }
}

function ChangeSym() {
    if (confirm("Existing work will be lost! Are you sure?") == true) {
        sym = document.getElementById("sym").value;
        Jmol.script(jmolApplet0, "reset ALL;rm={};set EchoCallback 'NONE';set LoadStructCallback 'file_loaded';load '' " + sym);
        name = name.split(' ')[0] + " " + sym;
        setup();
    }
}

function mesoporous_grid(axis, shape, pattern) 
{
    rand = document.getElementById("rand").value * 2;
    radius = document.getElementById("radius").value;
    Jmol.script(jmolApplet0, 'set EchoCallback "file_loaded"');
    if (document.getElementById("save_gif").checked)
        Jmol.script(jmolApplet0, 'animation FPS 2; capture "' + pattern + '-' + axis + '-' + name.split('.')[0] + '.gif" LOOP 0;');


    nnn = parseInt(pattern.split('_')[1]);
	even = (nnn % 2==0);
	if (even) nnn++;
	
    fac = 2.0 / (nnn + 1);
    for (ii = 1; ii <= nnn; ii++) {
        for (jj = 1; jj <= nnn; jj++) {
			if (even && (ii%2==0 || jj%2==0) && ii!=jj) continue;
			cx = (structure_dimensions['max_x'] + structure_dimensions['min_x'])/2;
			cy = (structure_dimensions['max_y'] + structure_dimensions['min_y'])/2;
			cz = (structure_dimensions['max_z'] + structure_dimensions['min_z'])/2;
			a = fac * ii;
            b = fac * jj;
            rx = rand * (Math.random() - 0.5);
            ry = rand * (Math.random() - 0.5);
            rz = rand * (Math.random() - 0.5);
			console.log("^^^^^^", nnn, ii, jj, a, b, even);
            if (shape == 'sphere' || shape == 'sphere2') {
                cx *= a;
                cy *= b;
                draw_mesoporous_sphere(0, cx+rx, cy+ry, cz, '', axis);
            }
            else if (axis == 'z') {
                cx *= a;
                cy *= b;
                draw_mesoporous_z(0, cx+rx, cy+ry, cz, "");
            }			
            else if (axis == 'y') {
                cx *= a;
                cz *= b;
                draw_mesoporous_y(0, cx+rx, cy, cz+rz, "");
            }
            else if (axis == 'x') {
                cz *= a;
                cy *= b;
                draw_mesoporous_x(0, cx, cy+ry, cz+rz, "");
            }
        }
    }
    if (shape == 'sphere2') mesoporous_grid("-" + axis, "sphere", pattern);
    Jmol.script(jmolApplet0, 'echo ' + name + ';set EchoCallback NONE;');
    if (document.getElementById("save_gif").checked)
	{
        Jmol.script(jmolApplet0, 'capture end;');
		document.getElementById("save_gif").checked = false;
	}
}

// function mesoporous(axis, shape, pattern) {
    // rand = document.getElementById("rand").value * 2;
    // Jmol.script(jmolApplet0, 'yy=all.y.max; xx=all.x.max; zz=all.z.max; set EchoCallback "file_loaded"');
    // if (document.getElementById("save_gif").checked) {
        // Jmol.script(jmolApplet0, 'animation FPS 5; capture "' + pattern + '-' + axis + '-' + name.split('.')[0] + '.gif" LOOP 0;');
        // console.log('Anim');
    // }
    // rx = rand * (Math.random() - 0.5);
    // ry = rand * (Math.random() - 0.5);
    // rz = rand * (Math.random() - 0.5);
    // console.log("*********", rand, rx, ry, rz);
    // cx = structure_dimensions['max_x']/2;
    // cy = structure_dimensions['max_y']/2;
    // cz = structure_dimensions['max_z']/2;
    // console.log("-------", cx, cy, cz);
    
	// if (shape == 'sphere' || shape == 'sphere2') {
        // draw_mesoporous_sphere(0, cx, cy, cz, "s1", axis);
        // cx = Jmol.evaluateVar(jmolApplet0, "xx * 0.5") + rz;
        // cy = Jmol.evaluateVar(jmolApplet0, "yy * 0.5") + rx;
        // draw_mesoporous_sphere(0, cx, cy, cz, "s2", axis);
        // cx = Jmol.evaluateVar(jmolApplet0, "xx * 1.5") + ry;
        // cy = Jmol.evaluateVar(jmolApplet0, "yy * 1.5") + rz;
        // draw_mesoporous_sphere(0, cx, cy, cz, "s3", axis);
        // if (pattern == "across_5") {
            // cx = Jmol.evaluateVar(jmolApplet0, "xx * 0.5") + rz;
            // cy = Jmol.evaluateVar(jmolApplet0, "yy * 1.5") + ry;
            // draw_mesoporous_sphere(0, cx, cy, cz, "s4", axis);
            // cx = Jmol.evaluateVar(jmolApplet0, "xx * 1.5") + ry;
            // cy = Jmol.evaluateVar(jmolApplet0, "yy * 0.5") + rx;
            // draw_mesoporous_sphere(0, cx, cy, cz, "s5", axis);
        // }
        // if (shape == 'sphere2') mesoporous("-" + axis, "sphere", pattern);
        // Jmol.script(jmolApplet0, 'echo ' + name + ';set EchoCallback "NONE"');
        // return;
    // }
    // if (axis == 'z') {
        // draw_mesoporous_z(0, cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "z1");
        // cx = Jmol.evaluateVar(jmolApplet0, "xx * 0.5") + ry;
        // cy = Jmol.evaluateVar(jmolApplet0, "yy * 0.5") + rx;
        // draw_mesoporous_z(0, cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "z2");
        // cx = Jmol.evaluateVar(jmolApplet0, "xx * 1.5") + rz;
        // cy = Jmol.evaluateVar(jmolApplet0, "yy * 1.5") + rx;
        // draw_mesoporous_z(0, cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "z3");
        // if (pattern == "across_5") {
            // cx = Jmol.evaluateVar(jmolApplet0, "xx * 0.5") + rz;
            // cy = Jmol.evaluateVar(jmolApplet0, "yy * 1.5") + ry;
            // draw_mesoporous_z(0, cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "z4");
            // cx = Jmol.evaluateVar(jmolApplet0, "xx * 1.5") + ry;
            // cy = Jmol.evaluateVar(jmolApplet0, "yy * 0.5") + rx;
            // draw_mesoporous_z(0, cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "z5");
        // }
    // }
    // if (axis == 'y') {
        // draw_mesoporous_y(0, cx, cy, cz, "y1");
        // cx = Jmol.evaluateVar(jmolApplet0, "xx * 0.5") + rz;
        // cz = Jmol.evaluateVar(jmolApplet0, "zz * 0.5");
        // draw_mesoporous_y(0, cx, cy, cz, "y2");
        // cx = Jmol.evaluateVar(jmolApplet0, "xx * 1.5") + rz;
        // cz = Jmol.evaluateVar(jmolApplet0, "zz * 1.5");
        // draw_mesoporous_y(0, cx, cy, cz, "y3");
        // if (pattern == "across_5") {
            // cx = Jmol.evaluateVar(jmolApplet0, "xx * 0.5");
            // cz = Jmol.evaluateVar(jmolApplet0, "zz * 1.5");
            // draw_mesoporous_y(0, cx, cy, cz, "y4");
            // cx = Jmol.evaluateVar(jmolApplet0, "xx * 1.5");
            // cz = Jmol.evaluateVar(jmolApplet0, "zz * 0.5") + rz;
            // draw_mesoporous_y(0, cx, cy, cz, "y5");
        // }
    // }
    // if (axis == 'x') {
        // draw_mesoporous_x(0, cx, cy, cz, "x1");
        // cy = Jmol.evaluateVar(jmolApplet0, "yy * 0.5") + rz;
        // cz = Jmol.evaluateVar(jmolApplet0, "zz * 0.5");
        // draw_mesoporous_x(0, cx, cy, cz, "x2");
        // cy = Jmol.evaluateVar(jmolApplet0, "yy * 1.5");
        // cz = Jmol.evaluateVar(jmolApplet0, "zz * 1.5");
        // draw_mesoporous_x(0, cx, cy, cz, "x3");
        // if (pattern == "across_5") {
            // cz = Jmol.evaluateVar(jmolApplet0, "zz * 0.5") + rz;
            // cy = Jmol.evaluateVar(jmolApplet0, "yy * 1.5");
            // draw_mesoporous_x(0, cx, cy, cz, "x4");
            // cz = Jmol.evaluateVar(jmolApplet0, "zz * 1.5");
            // cy = Jmol.evaluateVar(jmolApplet0, "yy * 0.5") + rz;
            // draw_mesoporous_x(0, cx, cy, cz, "x5");
        // }
    // }
    // Jmol.script(jmolApplet0, 'echo ' + name + ';set EchoCallback "NONE";');
    // if (document.getElementById("save_gif").checked)
        // Jmol.script(jmolApplet0, 'capture end;');

    // document.getElementById("save_gif").checked = false;
// }

function random_simulate(type, shape, n) {
    radius = document.getElementById("radius").value;
	rand = document.getElementById("rand").value * 5;
    if (!n || n < 2)
        n = 10; 	// default is 10 if n is inalid
    Jmol.script(jmolApplet0, 'set EchoCallback "file_loaded"');
    if (document.getElementById("save_gif").checked)
        Jmol.script(jmolApplet0, 'animation FPS 2; capture "random-' + type + '-' + name.split('.')[0] + '.gif" LOOP 0;');

    for (var i = 0; i < n; i++) {
        r = Math.random() - 0.5;
		rr = r * radius/2 + 1.0 * radius;  //normal distribution with std dev of 'type'
		cx = Math.random() * (structure_dimensions['max_x'] + structure_dimensions['min_x']);
        cy = Math.random() * (structure_dimensions['max_y'] + structure_dimensions['min_y']);
        cz = Math.random() * (structure_dimensions['max_z'] + structure_dimensions['min_z']);        
        
        if (shape == "sphere" || shape == "sphere2") {
            draw_mesoporous_sphere(rr.toFixed(1), cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "random", type);
            if (shape == "sphere2")
                draw_mesoporous_sphere(rr.toFixed(1), cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "random", "-" + type);
        }
        else if (type == "z")
            draw_mesoporous_z(rr.toFixed(0), cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "random");
        else if (type == "y")
            draw_mesoporous_y(rr.toFixed(0), cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "random");
        else if (type == "x")
            draw_mesoporous_x(rr.toFixed(0), cx.toFixed(3), cy.toFixed(3), cz.toFixed(3), "random");

    }
    Jmol.script(jmolApplet0, 'echo ' + name + ';set EchoCallback NONE; capture end;');
    document.getElementById("save_gif").checked = false;
}

function remove_atoms(atoms, pore) {
    Jmol.script(jmolApplet0, "select " + atoms);
    Jmol.script(jmolApplet0, "hs = " + atoms + ";spacefill 150%; delay .2;spacefill 100%; delay .2;spacefill 50%; delay .2; spacefill 20%; delay .2;");
    Jmol.script(jmolApplet0, "hide hidden or hs");
    Jmol.script(jmolApplet0, "spacefill ionic; spacefill 25%;");
    Jmol.script(jmolApplet0, 'rm.push(' + mesopore_id + ', [hs.element.pivot, hs]); set picking off;');
    pore['active'] = true;
    pore['showShape'] = true;
    console.log(pore, mesopore_id);
    mesopores.push(pore);
    mesopore_id += 1;
    //reset_controls();
}

function draw_mesoporous_sphere(radius, cx, cy, cz, sc, axis) {
    if (radius <= 0)
        radius = document.getElementById("radius").value;


    if (axis == '-z') cz = 0.9 * structure_dimensions['max_z'];
    if (axis == '-y') cy = 0.9 * structure_dimensions['max_y'];
    if (axis == '-x') cx = 0.9 * structure_dimensions['min_x'];
    if (axis == 'z') cz = 0.9 * structure_dimensions['max_z'];
    if (axis == 'y') cy = 0.9 * structure_dimensions['max_y'];
    if (axis == 'x') cx = 0.9 * structure_dimensions['max_x'];

    console.log("******", radius, cx, cy, cz, axis);

    Jmol.script(jmolApplet0, "c = {" + cx + " " + cy + " " + cz + "};");
    Jmol.script(jmolApplet0, "hs=select(a;{*};a.distance(@c) <= " + radius / 2.0 + ");");
    ht = 'cir' + mesopore_id;
    color = getColor(axis);
    if (!color) color = 'blue';
	opaque = document.getElementById("opaque").value;
	trans = 'translucent ' + opaque/100; 
    pore = {
        'id': ht, 'shape': 'Sphere', 'color': color, 'x': parseFloat(cx), 'y': parseFloat(cy),
        'z': parseFloat(cz), 'dia': radius, 'axis': axis, 'other': null
    };
    remove_atoms("hs", pore);
    Jmol.script(jmolApplet0, 'draw ' + ht + ' "' + ht + '" diameter ' + radius + '.0 ' + trans + ' ' + color + ' cylinder @c');
}

function draw_mesoporous_z(radius, cx, cy, cz, sc) {
    if (radius <= 0)
        radius = document.getElementById("radius").value;
    axis = 'z';
    console.log(cx, cy, cz, sc);
    Jmol.script(jmolApplet0, "c = {" + cx + " " + cy + " " + cz + "};");
    Jmol.script(jmolApplet0, "xx=c.x; yy=c.y; zz=all.z.max; zz0=all.z.min; d = {@xx @yy @zz}; hcyl=@zz - @zz0;");  // center
    Jmol.script(jmolApplet0, "xy=[];aa=select(a;{*};a.distance(@c) < @zz - @zz0); for (var i = 0; i < aa.count; i++) {x1=aa[i].x; y1=aa[i].y; dxy=sqrt((x1 - d.x)**2 + (y1 - d.y)**2); if (dxy<=" + radius / 2.0 + ") xy.push(aa[i])};");
    Jmol.script(jmolApplet0, "h2 = select(a;{xy};a.z >= @zz0 and a.z <= @zz);");
    ht = 'cyl' + mesopore_id;
    color = getColor(axis);
    if (!color) color = 'gray';
	opaque = document.getElementById("opaque").value;
	trans = 'translucent ' + opaque/100; 
    pore = {
        'id': ht,
        'shape': 'z-Cylinder',
        'color': color,
        'x': parseFloat(cx),
        'y': parseFloat(cy),
        'z': parseFloat(cz),
        'dia': radius,
        'axis': axis,
        'other': structure_dimensions['max_z'] - structure_dimensions['min_z']
    };
    remove_atoms("h2", pore);
    Jmol.script(jmolApplet0, 'draw ' + ht + ' "' + ht + '" diameter ' + radius + '.0 ' + trans + ' ' + color + ' cylinder {@xx @yy @zz0} {@xx @yy @zz} mesh nofill');
}

function draw_mesoporous_x(radius, cx, cy, cz, sc) {
    if (radius <= 0)
        radius = document.getElementById("radius").value;
    console.log(cx, cy, cz, sc);
    axis = 'x';
    Jmol.script(jmolApplet0, "c = {" + cx + " " + cy + " " + cz + "};");
    Jmol.script(jmolApplet0, "xx=all.x.max; xx0=all.x.min; yy=c.y; zz=c.z; d = {@xx @yy @zz};");  // center
    Jmol.script(jmolApplet0, "xy=[];aa=select(a;{*};a.distance(@c) < @xx-@xx0); for (var i = 0; i < aa.count; i++) {x1=aa[i].z; y1=aa[i].y; dxy=sqrt((x1 - d.z)**2 + (y1 - d.y)**2); if (dxy<=" + radius / 2.0 + ") xy.push(aa[i])};");
    Jmol.script(jmolApplet0, "h1 = select(a;{xy};a.x >= @xx0 and a.x <= @xx); ");
    ht = 'cyl' + mesopore_id;
    color = getColor(axis);
    if (!color) color = 'green';
	opaque = document.getElementById("opaque").value;
	trans = 'translucent ' + opaque/100; 

    pore = {
        'id': ht,
        'shape': 'x-Cylinder',
        'color': color,
        'x': parseFloat(cx),
        'y': parseFloat(cy),
        'z': parseFloat(cz),
        'dia': radius,
        'axis': axis,
        'other': structure_dimensions['max_x'] - structure_dimensions['min_x']
    };
    remove_atoms("h1", pore);
    Jmol.script(jmolApplet0, 'draw ' + ht + ' "' + ht + '" diameter ' + radius + '.0 ' + trans + ' ' + color + ' cylinder {@xx0 @yy @zz} {@xx @yy @zz} mesh nofill');

}

function draw_mesoporous_y(radius, cx, cy, cz, sc) {
    if (radius <= 0)
        radius = document.getElementById("radius").value;
    console.log(cx, cy, cz, sc);
    axis = 'y';
    Jmol.script(jmolApplet0, "c = {" + cx + " " + cy + " " + cz + "};");
    Jmol.script(jmolApplet0, "yy=all.y.max; yy0=all.y.min; xx=c.x; zz=c.z; d = {@xx @yy @zz};");  // center
    Jmol.script(jmolApplet0, "xy=[];aa=select(a;{*};a.distance(@c) < @yy - @yy0); for (var i = 0; i < aa.count; i++) {x1=aa[i].x; y1=aa[i].z; dxy=sqrt((x1 - d.x)**2 + (y1 - d.z)**2); if (dxy<=" + radius/2.0 + ") xy.push(aa[i])};");
    Jmol.script(jmolApplet0, "h3 = select(a;{xy};a.y >= @yy0 and a.y <= @yy); ");
    ht = 'cyl' + mesopore_id;
    color = getColor(axis);
    if (!color) color = 'red';
	opaque = document.getElementById("opaque").value;
	trans = 'translucent ' + opaque/100; 
    pore = {
        'id': ht,
        'shape': 'y-Cylinder',
        'color': color,
        'x': cx,
        'y': cy,
        'z': cz,
        'dia': radius,
        'axis': axis,
        'other': structure_dimensions['max_y'] - structure_dimensions['min_y']
    };
    remove_atoms("h3", pore);

    Jmol.script(jmolApplet0, 'draw ' + ht + ' "' + ht + '" diameter ' + radius + '.0 ' + trans + ' ' + color + ' cylinder {@xx @yy0 @zz} {@xx @yy @zz} mesh nofill');
}

function file_loaded(sa, sb, sc) {
    calls++;
    show_mesopores();
}

function hide_atoms_z(sa, sb, sc) {
    sc = "" + sc;
    sb = "" + sb;
    axis = 'z';
    var res = sb.split(" ");
    draw_mesoporous_z(0, res[2], res[3], res[4], sc);
    //show_mesopores();
}

function hide_atoms_y(sa, sb, sc) {
    sc = "" + sc;
    sb = "" + sb;
    axis = 'y';
    var res = sb.split(" ");
    draw_mesoporous_y(0, res[2], res[3], res[4], sc);
    show_mesopores();
}

function hide_atoms_x(sa, sb, sc) {
    sc = "" + sc;
    sb = "" + sb;
    axis = 'x';
    var res = sb.split(" ");
    //console.log(res[2], res[3], res[4]);
    draw_mesoporous_x(0, res[2], res[3], res[4], sc);
    show_mesopores();
}

function hide_atoms_sphere(sa, sb, sc) {
    sc = "" + sc;
    sb = "" + sb;
    axis = 'xyz';   //document.getElementById('axis').value;
    var res = sb.split(" ");
    draw_mesoporous_sphere(0, res[2], res[3], res[4], sc, axis);
    show_mesopores();
}

function hide_atoms_sphere2(sa, sb, sc) {
    sc = "" + sc;
    sb = "" + sb;
    axis = document.getElementById('axis').value;
    var res = sb.split(" ");
    draw_mesoporous_sphere(0, res[2], res[3], res[4], sc, axis);
    draw_mesoporous_sphere(0, res[2], res[3], res[4], sc, "-" + axis);
    show_mesopores();
}

function pick_process(axis, shape) {
    document.getElementById("edit").checked = false;
    if (shape == 'sphere' || shape == 'sphere2')
        Jmol.script(jmolApplet0, 'set picking ON;  set PickCallback "hide_atoms_' + shape + '"');
    else
        Jmol.script(jmolApplet0, 'set picking ON;  set PickCallback "hide_atoms_' + axis + '"');
}


function save() {
    Jmol.script(jmolApplet0, 'write image 1200 1200 PNGT ' + name.split('.')[0] + '_' + gView + '.png;');
    Jmol.script(jmolApplet0, 'write image 1000 1000 PDF ' + name.split('.')[0] + '_' + gView + '.pdf;');
}

function saveJSON() {
    Jmol.script(jmolApplet0, 'write JSON ' + name.split('.')[0] + '.json');
}

function show_mesopores() {
    all = Jmol.evaluateVar(jmolApplet0, "all.count");
    elements = Jmol.evaluateVar(jmolApplet0, "all.element.pivot");
    cif = Jmol.getPropertyAsString(jmolApplet0, "fileName");
    fn = cif.split('/');
    len = fn.length;
    file = fn[len - 1];
    //name = file;
    //modelInfo = Jmol.getPropertyAsArray(jmolApplet0, "modelInfo");
    fi = Jmol.getPropertyAsArray(jmolApplet0, "fileinfo.models[1]");
    cif_head = name;
    if (fi._chemical_name_common)
        cif_head = name + " - " + fi._chemical_name_common;

	structure_dimensions = {
		'max_x': Jmol.evaluateVar(jmolApplet0, "all.x.max"), 
		'max_y': Jmol.evaluateVar(jmolApplet0, "all.y.max"), 
		'max_z': Jmol.evaluateVar(jmolApplet0, "all.z.max"),
		'min_x': Jmol.evaluateVar(jmolApplet0, "all.x.min"), 
		'min_y': Jmol.evaluateVar(jmolApplet0, "all.y.min"), 
		'min_z': Jmol.evaluateVar(jmolApplet0, "all.z.min")		
	}
    //box = Jmol.evaluateVar(jmolApplet0, "getProperty('boundboxInfo.corner0')");
    str = "<h3>Framework</h3><p>" + cif_head + "<br>" + cif + "<br>Atoms: " + all + ", " + JSON.stringify(elements, null, 2) + "</p>";
    //calls++;
    str += "<p>" + calls +  "</p>";

    str += '<div> \
<table class="table table-condensed"> \
<tr><th colspan="3" >Unit Cell Lengths (&Aring;)</th><th colspan="3">Cell Angles (deg)</th></tr> \
<tr align="center"><th>a</th><th>b</th><th>c</th><th>&alpha;</th><th>&beta;</th><th>&gamma;</th></tr> \
<tr><td>' + fi._cell_length_a + '</td><td>' + fi._cell_length_b + '</td><td>' + fi._cell_length_c + '</td> \
<td>' + fi._cell_angle_alpha + '</td><td>' + fi._cell_angle_beta + '</td><td>' + fi._cell_angle_gamma + '</td></tr> \
<tr><th colspan="6" >Total Dimensions (&Aring;)</th></tr> \
<tr><td>' + structure_dimensions['min_x'] + '</td><td>' + structure_dimensions['min_y'] + '</td><td>' + structure_dimensions['min_z'] + '</td><th colspan="3" >Min</th></tr> \
<tr><td>' + structure_dimensions['max_x'] + '</td><td>' + structure_dimensions['max_y'] + '</td><td>' + structure_dimensions['max_z'] + '</td><th colspan="3" >Max</th></tr> \
</table>';

    n = mesopores.length;
    str += "<h3>Mesopore List</h3> &nbsp;&nbsp;&nbsp;";
    str += '<input type="button" class="btn btn-primary btn-xs" id="btnSae" value="Update" onclick="show_mesopores();" />'
    if (n > 0) {
        str += '<table class="table table-condensed table-bordered"><tr>';
        str += '<th>Id</th><th>Color</th><th>Shape</th><th>Coordinates (&Aring;)</th><th>Dia (&Aring;)</th><th>Removed Atoms</th><th>Action</th><th>Shape?</th></tr>';
    }
    for (i = 0; i < n; i++) {
        id = mesopores[i]['id'];
        removed = Jmol.evaluateVar(jmolApplet0, "rm['" + i + "'][1]");
        atoms_removed = Jmol.evaluateVar(jmolApplet0, "rm['" + i + "'][2]");
        color = mesopores[i]['color'];
        color = color.replace('[x', '#');
        color = color.replace(']', '');
        str += "<tr><td>" + id + "</td><td><font color=" + color + ">" + color + "</font></td><td>" + mesopores[i]['shape'] + "</td>";
        str += "<td align='center'>" + mesopores[i]['x'].toFixed(3) + ", " + mesopores[i]['y'].toFixed(3) + ", " + mesopores[i]['z'].toFixed(3) + "</td>";
        str += "<td align='center'>" + mesopores[i]['dia'] + "</td><td align='center'>" + JSON.stringify(removed, null, 2) + "</td>";
        Jmol.script(jmolApplet0, 'hh' + i + '= rm["' + i + '"][2]');
        undo = "Jmol.script(jmolApplet0, 'draw " + id + " off; hide hidden and not hh" + i + "');redo_mesopore(this, " + i + ");";
        mesopores[i]['removed_count'] = removed;
        mesopores[i]['removed_atoms'] = atoms_removed;
        //console.log(undo);
        undo_redo = "Redo";
        if (mesopores[i]['active'] == true)
            undo_redo = "Undo";
        str += '<td><input type="button" id="undo"' + i + ' value="' + undo_redo + '" onclick="' + undo + '" /></td>';
        ssh = "";
        if (mesopores[i]['showShape'] == true)
            ssh = "checked";
        str += '<td align="center"><input type="checkbox" id="shape' + i + '" ' + ssh + ' onclick="show_shape(' + i + ');"/></td></tr>';
    }
    str += '</table></div>';
    document.getElementById("reportdiv").innerHTML = str;
}

function show_shape(n) {
    id = mesopores[n]['id'];

    mesopores[n]['showShape'] = !mesopores[n]['showShape']; //toggle

    if (mesopores[n]['showShape'])
        Jmol.script(jmolApplet0, 'draw ' + id + ' on;');
    else
        Jmol.script(jmolApplet0, 'draw ' + id + ' off;');
}

function redo_mesopore(el, n) {

    id = mesopores[n]['id'];
    console.log(n, id);

    if (el.value === "Undo") {
        el.value = "Redo";
        mesopores[n]['active'] = false;
        mesopores[n]['showShape'] = false;
        document.getElementById("shape" + n).checked = false;
        el.onclick = function () {
            Jmol.script(jmolApplet0, 'draw ' + id + ' on; hide hidden or hh' + n);
            redo_mesopore(this, n);
        };
    }
    else {
        el.value = "Undo";
        mesopores[n]['active'] = true;
        mesopores[n]['showShape'] = true;
        document.getElementById("shape" + n).checked = true;
        el.onclick = function () {
            Jmol.script(jmolApplet0, 'draw ' + id + ' off; hide hidden and not hh' + n);
            redo_mesopore(this, n);
        };
    }
}

function run_mesopore() {
    shape = document.getElementById("shape").value;
    axis = document.getElementById('axis').value;
    pattern = document.getElementById("pattern").value;
    console.log(axis, shape, pattern);
	
    if (pattern == "sample") {
        random_simulate('z', 'cylinder', 2);
        random_simulate('x', 'sphere2', 2);
        random_simulate('y', 'sphere', 2);
    }
    if (pattern == 'pick')
        pick_process(axis, shape);
    else if (pattern == 'random_5')
        random_simulate(axis, shape, 5);
    else if (pattern == 'random_10')
        random_simulate(axis, shape, 10);
    else
		mesoporous_grid(axis, shape, pattern);
}

function getColor(axis) {
    Colors = ['lightblue', 'yellow', 'gray', 'cyan', 'red', 'green', 'SeaShell', 'LightSalmon']
    var clr = document.getElementById("colorPick").value;
    var coloring = document.getElementById("coloring").value;
    if (coloring == -1) {
        color = null;
    }
    else if (coloring == -2) {
        color = "[x" + clr + "]";
    }
    else {
        color = Colors[coloring];
    }
    return color
}

function logout(url) {
    var http = new XMLHttpRequest();
    http.open("get", url, false, "null", "null");
    http.send("");
    location.href = "index.html";
    //alert("You have been logged out.");
    return false;
}

//<![CDATA[
$(function () {
    $("#savesim").on("click", function () {
        fname = getFilename("zeosim-" + name.split('.')[0] + ".json");
        if (fname) {
            show_mesopores();
            fi = Jmol.getPropertyAsArray(jmolApplet0, "fileinfo.models[1]");
            simulation = {"name": name, "model": fi, "mesopores": mesopores};
            $(this).attr("href", "data:text/json;charset=utf8, " + encodeURIComponent(JSON.stringify(simulation, null, 4))).attr("download", fname);
        }
    });
});//]]> 


