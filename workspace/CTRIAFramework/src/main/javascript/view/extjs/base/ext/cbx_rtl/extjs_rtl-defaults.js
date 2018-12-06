/**
 * Copyright 2014. Intellect Design Arena Limited. All rights reserved. 
 * 
 * These materials are confidential and proprietary to Intellect Design Arena 
 * Limited and no part of these materials should be reproduced, published, transmitted
 * or distributed in any form or by any means, electronic, mechanical, photocopying, 
 * recording or otherwise, or stored in any information storage or retrieval system 
 * of any nature nor should the materials be disclosed to third parties or used in any 
 * other manner for which this is not authorized, without the prior express written 
 * authorization of Intellect Design Arena Limited.
 * 
 */




// default menu aligns
Ext.override(Ext.Button, { menuAlign:'tr-br?', iconAlign: 'right', subMenuAlign:'tr-tl?' });
Ext.override(Ext.menu.Menu, { subMenuAlign:'tr-tl?' });
Ext.override(Ext.menu.DateMenu, { subMenuAlign:'tr-tl?' });
Ext.override(Ext.menu.ColorMenu, { subMenuAlign:'tr-tl?' });

/** 
 * After rendering the menu, the sub-menu position aligned based on parent menu in rtl mode 
 */ 
Ext.override(Ext.menu.Menu, {
	show : function(el, pos, parentMenu){
        if(this.floating){
            this.parentMenu = parentMenu;
            if(!this.el){
                this.render();
                this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign, this.defaultOffsets), parentMenu); // For RTL
                this.doLayout(false, true);
            }
            this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign, this.defaultOffsets), parentMenu);
        }else{
            Ext.menu.Menu.superclass.show.call(this);
        }
    }
});

// default align for tips
Ext.override(Ext.Tip, {target: this.el,anchor:'left'});

// isClickOnArrow for SplitButton should check for smaller than left
Ext.override(Ext.SplitButton, {
    isClickOnArrow : function(e){
        return this.arrowAlign != 'bottom' ?
               e.getPageX() < this.el.child(this.buttonSelector).getRegion().left :  // changed for RTL
               e.getPageY() > this.el.child(this.buttonSelector).getRegion().bottom;
    }
});



// Ext.layout.HBoxLayout needs total new onLayout
Ext.override(Ext.layout.HBoxLayout,{
    onLayout : function(ct, target){
        Ext.layout.HBoxLayout.superclass.onLayout.call(this, ct, target);

        var cs = ct.items.items, len = cs.length, c, i, last = len-1, cm;
		
		if(!this.getTargetSize)
			return;
        var size = this.getTargetSize(target);

        var w = size.width - target.getPadding('lr') - this.scrollOffset,
            h = size.height - target.getPadding('tb'),
            l = this.padding.left, t = this.padding.top;

        if ((Ext.isIE && !Ext.isStrict) && (w < 1 || h < 1)) {
            return;
        } else if (w < 1 && h < 1) { 
            return;
        }

        var stretchHeight = h - (this.padding.top + this.padding.bottom);

        var totalFlex = 0;
        var totalWidth = 0;

        var maxHeight = 0;

        for(i = 0; i < len; i++){
            c = cs[i];
            cm = c.margins;
            totalFlex += c.flex || 0;
            totalWidth += c.getWidth() + cm.left + cm.right;
            maxHeight = Math.max(maxHeight, c.getHeight() + cm.top + cm.bottom);
        }

        var innerCtHeight = maxHeight + this.padding.top + this.padding.bottom;

        switch(this.align){
            case 'stretch':
                this.innerCt.setSize(w, h);
                break;
            case 'stretchmax':
            case 'top':
                this.innerCt.setSize(w, innerCtHeight);
                break;
            case 'middle':
                this.innerCt.setSize(w, h = Math.max(h, innerCtHeight));
                break;

        }

        var extraWidth = w - totalWidth - this.padding.left - this.padding.right;
        var allocated = 0;

        var cw, ch, ct, availableHeight = h - this.padding.top - this.padding.bottom;

        if(this.pack == 'center'){
            l += extraWidth ? extraWidth/2 : 0;
        }else if(this.pack == 'end'){
            l += extraWidth;
        }
        for(i = 0; i < len; i++){
            c = cs[i];
            cm = c.margins;
            cw = c.getWidth();
            ch = c.getHeight();

            l += cm.right;
            if(this.align != 'middle'){
                ct = t + cm.top;
            }else{
                var diff = availableHeight - (ch + cm.top + cm.bottom);
                if(diff == 0){
                    ct = t + cm.top;
                }else{
                    ct = t + cm.top + (diff/2);
                }
            }

            if(this.pack == 'start' && c.flex){
                var ratio = c.flex/totalFlex;
                var add = Math.floor(extraWidth*ratio);
                allocated += add;
                if(i == last){
                    add += (extraWidth-allocated);
                }
                cw += add;
                c.setWidth(cw);
            }
            c.setPosition(w - l - cw, ct);
            if(this.align == 'stretch'){
                c.setHeight((stretchHeight - (cm.top + cm.bottom)).constrain(c.minHeight || 0, c.maxHeight || 1000000));
            }else if(this.align == 'stretchmax'){
                c.setHeight((maxHeight - (cm.top + cm.bottom)).constrain(c.minHeight || 0, c.maxHeight || 1000000));
            }
            l += cw + cm.left;
        }
    }

});

Ext.override(Ext.layout.VBoxLayout, {
    onLayout : function(ct, target){
        Ext.layout.VBoxLayout.superclass.onLayout.call(this, ct, target);

        var cs = ct.items.items, len = cs.length, c, i, last = len-1, cm;
        var size = this.getTargetSize(target);

        var w = size.width - target.getPadding('lr') - this.scrollOffset,
            h = size.height - target.getPadding('tb'),
            l = this.padding.right, t = this.padding.top;

        if ((Ext.isIE && !Ext.isStrict) && (w < 1 || h < 1)) {
            return;
        } else if (w < 1 && h < 1) {
            return;
        }

        var stretchWidth = w - (this.padding.left + this.padding.right);

        var totalFlex = 0;
        var totalHeight = 0;

        var maxWidth = 0;

        for(i = 0; i < len; i++){
            c = cs[i];
            cm = c.margins;
            totalFlex += c.flex || 0;
            totalHeight += c.getHeight() + cm.top + cm.bottom;
            maxWidth = Math.max(maxWidth, c.getWidth() + cm.left + cm.right);
        }

        var innerCtWidth = maxWidth + this.padding.left + this.padding.right;

        switch(this.align){
            case 'stretch':
                this.innerCt.setSize(w, h);
                break;
            case 'stretchmax':
            case 'left':
            case 'center':
                this.innerCt.setSize(w = Math.max(w, innerCtWidth), h);
                break;

        }

        var extraHeight = h - totalHeight - this.padding.top - this.padding.bottom;
        var allocated = 0;

        var cw, ch, cl, availableWidth = w - this.padding.left - this.padding.right;

        if(this.pack == 'center'){
            t += extraHeight ? extraHeight/2 : 0;
        }else if(this.pack == 'end'){
            t += extraHeight;
        }
        for(i = 0; i < len; i++){
            c = cs[i];
            cm = c.margins;
            cw = c.getWidth();
            ch = c.getHeight();

            t += cm.top;
            if(this.align != 'center'){
                cl = l + cm.right;
            }else{
                var diff = availableWidth - (cw + cm.left + cm.right);
                if(diff == 0){
                    cl = l + cm.right;
                }else{
                    cl = l + cm.right + (diff/2);
                }
            }

            c.setPosition(w - cl - cw, t);
            if(this.pack == 'start' && c.flex){
                var ratio = c.flex/totalFlex;
                var add = Math.floor(extraHeight*ratio);
                allocated += add;
                if(i == last){
                    add += (extraHeight-allocated);
                }
                ch += add;
                c.setHeight(ch);
            }
            if(this.align == 'stretch'){
                c.setWidth((stretchWidth - (cm.left + cm.right)).constrain(c.minWidth || 0, c.maxWidth || 1000000));
            }else if(this.align == 'stretchmax'){
                c.setWidth((maxWidth - (cm.left + cm.right)).constrain(c.minWidth || 0, c.maxWidth || 1000000));
            }
            t += ch + cm.bottom;
        }
    }
});

// FormLayout

// Toolbar
Ext.override(Ext.layout.ToolbarLayout ,{
    onLayout : function(ct, target){
    	if (!this.leftTr) {
	
			var align = ct.buttonAlign == 'center' ? 'center' : 'left';
			target.addClass('x-toolbar-layout-ct');
			if (target.dom.parentNode.className && target.dom.parentNode.className==='x-html-editor-tb') {
				//alert('FROM EDITOR');
				target.insertHtml('beforeEnd', String.format(this.tableHTML, align));
				if (this.hiddenItem == undefined) {
					this.hiddenItems = [];
				}
			} else {
				target.insertHtml('beforeEnd',
                '<table cellspacing="0" class="x-toolbar-ct"><tbody><tr><td class="x-toolbar-right" align="right"><table cellspacing="0"><tbody><tr class="x-toolbar-right-row"></tr></tbody></table></td><td class="x-toolbar-left" align="left"><table cellspacing="0" class="x-toolbar-left-ct"><tbody><tr><td><table cellspacing="0"><tbody><tr class="x-toolbar-left-row"></tr></tbody></table></td><td><table cellspacing="0"><tbody><tr class="x-toolbar-extras-row"></tr></tbody></table></td></tr></tbody></td></tr></tbody></table>');
           }

			this.leftTr = target.child('tr.x-toolbar-left-row', true);
			this.rightTr = target.child('tr.x-toolbar-right-row', true);
			this.extrasTr = target.child('tr.x-toolbar-extras-row', true);
		}
        var side = this.rightTr;
        var pos = 0;

        var items = ct.items.items;
        for(var i = 0, len = items.length, c; i < len; i++, pos++) {
        	
            c = items[i];
            if(c.isFill){
                side = this.leftTr;
                pos = -1;
            }else if(!c.rendered){
                c.render(this.insertCell(c, side, pos));
            }else{
                if(!c.xtbHidden && !this.isValidParent(c, side.childNodes[pos])){
                    var td = this.insertCell(c, side, pos); 
    
                    if (target.dom.parentNode.className && target.dom.parentNode.className==='x-html-editor-tb') {
						this.configureItem(c);
					}
   
                   
                    if(c.getPositionEl){
                    	td.appendChild(c.getPositionEl().dom);	
                    }
                    
                    c.container = Ext.get(td);
                }
            }
        }
        //strip extra empty cells
        this.cleanup(this.leftTr);
        this.cleanup(this.rightTr);
        this.cleanup(this.extrasTr);
        this.fitToSize(target);
    }
});

// HtmlEditor
Ext.override(Ext.form.HtmlEditor, {
    getDocMarkup : function(){
        return '<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;direction:rtl;}</style></head><body></body></html>';
    }
});

// DateField
Ext.override(Ext.form.DateField, {
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Ext.menu.DateMenu({
                hideOnClick: false
            });
        }
        Ext.apply(this.menu.picker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.disabledDatesRE,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            showToday : this.showToday,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tr-br?");
        this.menuEvents('on');
    }
});

// Tabs Scroll
Ext.override(Ext.Element, {
    scrollTo : function(side, value, animate){
    	var side = side.toLowerCase();
        var prop;
    	switch (side) {
    		case "left":
    			prop = "scrollLeft";
    			break;
    		case "right":
    			prop = "scrollLeft";
    			value = this.dom.scrollWidth - (value + this.dom.clientWidth);
    			break;
    		case "top":
    			prop = "scrollTop";
    			break;
    		case "bottom":
    			prop = "scrollTop";
    			value = this.dom.scrollHeight - (value + this.dom.clientHeight);
    			break;
    	}
		
		
		/*
		* 
		* In RTL mode tab positions get changed from "left" end to "right", so "scrollto" position will have 
		* nagative values.
		* Negative value check is commented to allow the tab scrolling in RTL mode. 
		*
		*/
		
    	/*if (value < 0) value = 0;*/ 
		
        if(!animate){
            this.dom[prop] = value;
        }else{
            var to = prop == "scrollLeft" ? [value, this.dom.scrollTop] : [this.dom.scrollLeft, value];
            this.anim({scroll: {"to": to}}, this.preanim(arguments, 2), 'scroll');
        }
        return this;
    }
});
//Tab
Ext.override(Ext.TabPanel, {
    autoScrollTabs : function(){
        this.pos = this.tabPosition=='bottom' ? this.footer : this.header;
        var count = this.items.length;
        var ow = this.pos.dom.offsetWidth;
        var tw = this.pos.dom.clientWidth;

        var wrap = this.stripWrap;
        var wd = wrap.dom;
        var cw = wd.offsetWidth;
        var pos = this.getScrollPos();
        var l = cw - (this.edge.getOffsetsTo(this.stripWrap)[0] + pos);
        if(!this.enableTabScroll || count < 1 || cw < 20){ // 20 to prevent display:none issues
            return;
        }
        if(l <= tw){
            wrap.setWidth(tw);
            if(this.scrolling){
                this.scrolling = false;
                this.pos.removeClass('x-tab-scrolling');
                this.scrollLeft.hide();
                this.scrollRight.hide();
                // See here: http://extjs.com/forum/showthread.php?t=49308&highlight=isSafari
                if(Ext.isAir || Ext.isWebKit){
                    wd.style.marginLeft = '';
                    wd.style.marginRight = '';
                }
            }
            wd.scrollLeft = 0;
        }else{
            if(!this.scrolling){
                this.pos.addClass('x-tab-scrolling');
                // See here: http://extjs.com/forum/showthread.php?t=49308&highlight=isSafari
                if(Ext.isAir || Ext.isWebKit){
                    wd.style.marginLeft = '18px';
                    wd.style.marginRight = '18px';
                }
            }
            tw -= wrap.getMargins('lr');
            wrap.setWidth(tw > 20 ? tw : 20);
            if(!this.scrolling){
                if(!this.scrollLeft){
                    this.createScrollers();
                }else{
                    this.scrollLeft.show();
                    this.scrollRight.show();
                }
            }
            this.scrolling = true;
            if(pos > (l-tw)){ // ensure it stays within bounds
                wd.scrollLeft = l-tw;
            }else{ // otherwise, make sure the active tab is still visible
                this.scrollToTab(this.activeTab, false);
            }
            this.updateScrollButtons();
        }
    },
    onScrollRight : function(){
        var pos = this.getScrollPos();
        var s = Math.max(this.getScrollWidth(), pos - this.getScrollIncrement());
        if(s != pos){
            this.scrollTo(s, this.animScroll);
        }
    },
    onScrollLeft : function(){
        var pos = this.getScrollPos();
        var s = Math.min(0, pos + this.getScrollIncrement());

        if(s != pos){
            this.scrollTo(s, this.animScroll);
        }
    },

    // private
    updateScrollButtons : function(){
        var pos = this.getScrollPos();
        this.scrollLeft[pos == 0 ? 'addClass' : 'removeClass']('x-tab-scroller-left-disabled');
        this.scrollRight[pos <= this.getScrollWidth() ? 'addClass' : 'removeClass']('x-tab-scroller-right-disabled');
    }
});

// Grids
Ext.override(Ext.grid.GridView.SplitDragZone,{
    handleMouseDown : function(e){
        var t = this.view.findHeaderCell(e.getTarget());
        if(t){
            var xy = this.view.fly(t).getXY(), x = xy[0], y = xy[1];
            var exy = e.getXY(), ex = exy[0];
            var w = t.offsetWidth, adjust = false;
            if((ex - x) <= this.hw){
                adjust = 0;
            }else if((x+w) - ex <= this.hw){
                adjust = -1;
            }
            if(adjust !== false){
                this.cm = this.grid.colModel;
                var ci = this.view.getCellIndex(t);
                if(adjust == -1){
                  if (ci + adjust < 0) {
                    return;
                  }
                    while(this.cm.isHidden(ci+adjust)){
                        --adjust;
                        if(ci+adjust < 0){
                            return;
                        }
                    }
                }
                this.cellIndex = ci+adjust;
                this.split = t.dom;
                if(this.cm.isResizable(this.cellIndex) && !this.cm.isFixed(this.cellIndex)){
                    Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown.apply(this, arguments);
                }
            }else if(this.view.columnDrag){
                this.view.columnDrag.callHandleMouseDown(e);
            }
        }
    },
    endDrag : function(e){
        this.marker.hide();
        var v = this.view;
        var endX = Math.max(this.minX, e.getPageX());
        var diff = this.startPos - endX;
        v.onColumnSplitterMoved(this.cellIndex, this.cm.getColumnWidth(this.cellIndex)+diff);
        setTimeout(function(){
            v.headersDisabled = false;
        }, 50);
    }
});

Ext.override(Ext.grid.GridView, {
    handleHdMove : function(e, t){
        if(this.activeHd && !this.headersDisabled){
            var hw = this.splitHandleWidth || 5;
            var r = this.activeHdRegion;
            var x = e.getPageX();
            var ss = this.activeHd.style;
            if(r.right - x <= hw && this.cm.isResizable(this.activeHdIndex-1)){
                ss.cursor = Ext.isAir ? 'move' : Ext.isWebKit ? 'e-resize' : 'col-resize'; // col-resize not always supported
            }else if(x - r.left <= (!this.activeHdBtn ? hw : 2) && this.cm.isResizable(this.activeHdIndex)){
                ss.cursor = Ext.isAir ? 'move' : Ext.isWebKit ? 'w-resize' : 'col-resize';
            }else{
                ss.cursor = '';
            }
        }
    },
    syncFocusEl : function(row, col, hscroll){
        var xy = row;
        if(!Ext.isArray(xy)){
            row = Math.min(row, Math.max(0, this.getRows().length-1));
            xy = this.getResolvedXY(this.resolveCell(row, col, hscroll));
        }
        var sc_xy = this.scroller.getXY()
        if (!xy) {xy=sc_xy;}
        //this.focusEl.setXY(xy||this.scroller.getXY());
        this.focusEl.setTop(xy[1]-sc_xy[1]+this.scroller.getScroll().top);
        this.focusEl.setRight(xy[0]-sc_xy[0]);
    },
    handleHdDown : function(e, t){
        if(Ext.fly(t).hasClass('x-grid3-hd-btn')){
            e.stopEvent();
            var hd = this.findHeaderCell(t);
            Ext.fly(hd).addClass('x-grid3-hd-menu-open');
            var index = this.getCellIndex(hd);
            this.hdCtxIndex = index;
            var ms = this.hmenu.items, cm = this.cm;
            ms.get("asc").setDisabled(!cm.isSortable(index));
            ms.get("desc").setDisabled(!cm.isSortable(index));
            this.hmenu.on("hide", function(){
                Ext.fly(hd).removeClass('x-grid3-hd-menu-open');
            }, this, {single:true});
            this.hmenu.show(t, "tr-br?");
        }
    }

});

// Switch cell selection model arrow keys
(function() {
  var originalHandleKeyDown = Ext.grid.CellSelectionModel.prototype.handleKeyDown;

  Ext.override(Ext.grid.CellSelectionModel, {
    handleKeyDown: function(e) {
        var k = e.getKey();
        switch (k) {
            case e.RIGHT: e.keyCode = e.LEFT; break;
            case e.LEFT: e.keyCode = e.RIGHT; break;
        }
        originalHandleKeyDown.apply(this, arguments);
    }
  });
})();

Ext.override(Ext.Layer, {
    hideAction : function(){
        this.visible = false;
        if(this.useDisplay === true){
            this.setDisplayed(false);
        }else{
            this.setLeftTop(0,-10000); // negative x in firefox shows scrollbar in RTL
        }
    }
});

/* iportal static textarea */
/* FormLayout */
Ext.override(Ext.layout.FormLayout, {	

setContainer : function(ct){
    Ext.layout.FormLayout.superclass.setContainer.call(this, ct);
    if(ct.labelAlign){
        ct.addClass('x-form-label-'+ct.labelAlign);
    }

    if(ct.hideLabels){
        Ext.apply(this, {
            labelStyle: 'display:none',
            elementStyle: 'padding-right:0;',
            labelAdjust: 0
        });
    }else{
        this.labelSeparator = Ext.isDefined(ct.labelSeparator) ? ct.labelSeparator : this.labelSeparator;
        ct.labelWidth = ct.labelWidth || 100;
        if(Ext.isNumber(ct.labelWidth)){
            var pad = Ext.isNumber(ct.labelPad) ? ct.labelPad : 5;
            Ext.apply(this, {
                labelAdjust: ct.labelWidth + pad,
                labelStyle: 'width:' + ct.labelWidth + 'px;',
                elementStyle: 'padding-left:' + (ct.labelWidth + pad) + 'px'
            });
        }
        if(ct.labelAlign == 'top'){
            Ext.apply(this, {
                labelStyle: 'width:auto;',
                labelAdjust: 0,
                elementStyle: 'padding-right:0;'
            });
        }
    }
}
});
/*
Ext.override(Ext.layout.BorderLayout.SplitRegion, {


	  splitSettings : {
	        north : {
	            orientation: Ext.SplitBar.VERTICAL,
	            placement: Ext.SplitBar.TOP,
	            maxFn : 'getVMaxSize',
	            minProp: 'minHeight',
	            maxProp: 'maxHeight'
	        },
	        south : {
	            orientation: Ext.SplitBar.VERTICAL,
	            placement: Ext.SplitBar.BOTTOM,
	            maxFn : 'getVMaxSize',
	            minProp: 'minHeight',
	            maxProp: 'maxHeight'
	        },
	        west : {
	            orientation: Ext.SplitBar.HORIZONTAL,
	            placement: Ext.SplitBar.RIGHT,
	            maxFn : 'getHMaxSize',
	            minProp: 'minWidth',
	            maxProp: 'maxWidth'
	        },
	        east : {
	            orientation: Ext.SplitBar.HORIZONTAL,
	            placement: Ext.SplitBar.LEFT,
	            maxFn : 'getHMaxSize',
	            minProp: 'minWidth',
	            maxProp: 'maxWidth'
	        }
	    }
	
	
});*/




// Note : At the time of Locking Grid integration - enable this code.
/*Ext.override(Ext.ux.grid.LockingGridView, { 
    updateLockedWidth: function(){
        var lw = this.cm.getTotalLockedWidth(),
            tw = this.cm.getTotalWidth() - lw,
            csize = this.grid.getGridEl().getSize(true),
            lp = Ext.isBorderBox ? 0 : this.lockedBorderWidth,
            rp = Ext.isBorderBox ? 0 : this.rowBorderWidth,
            vw = Math.max(csize.width - lw - lp - rp, 0) + 'px',
            so = this.getScrollOffset();
        if(!this.grid.autoHeight){
            var vh = Math.max(csize.height - this.mainHd.getHeight(), 0) + 'px';
            this.lockedScroller.dom.style.height = vh;
            this.scroller.dom.style.height = vh;
        }
        this.lockedWrap.dom.style.width = (lw + rp) + 'px';
        this.scroller.dom.style.width = vw;
      this.mainWrap.dom.style.left = 0 + 'px'; // For RTL purpose
      // this.mainWrap.dom.style.left = (lw + lp + rp) + 'px'; // For RTL its commented.
        if(this.innerHd){
            this.lockedInnerHd.firstChild.style.width = lw + 'px';
            this.lockedInnerHd.firstChild.firstChild.style.width = lw + 'px';
            this.innerHd.style.width = vw;
            this.innerHd.firstChild.style.width = (tw + rp + so) + 'px';
            this.innerHd.firstChild.firstChild.style.width = tw + 'px';
        }
        if(this.mainBody){
            this.lockedBody.dom.style.width = (lw + rp) + 'px';
            this.mainBody.dom.style.width = (tw + rp) + 'px';
        }
    }
});	
*/



/* tool tip for RTL */

Ext.Element.addMethods({
    adjustForConstraints : function(xy, parent, offsets){
        return this.getConstrainToXY(parent || document, false, offsets, xy) ||  xy;
    },
   
    getConstrainToXY : function(el, local, offsets, proposedXY){   
	    var os = {top:0, left:0, bottom:0, right: 0};

        return function(el, local, offsets, proposedXY){
            el = Ext.get(el);
            offsets = offsets ? Ext.applyIf(offsets, os) : os;

            var vw, vh, vx = 0, vy = 0;
            if(el.dom == document.body || el.dom == document){
                vw =Ext.lib.Dom.getViewWidth();
                vh = Ext.lib.Dom.getViewHeight();
            }else{
                vw = el.dom.clientWidth;
                vh = el.dom.clientHeight;
                if(!local){
                    var vxy = el.getXY();
                    vx = vxy[0];
                    vy = vxy[1];
                }
            }

            var s = el.getScroll();

            vx += offsets.left + s.left;
            vy += offsets.top + s.top;

            vw -= offsets.right;
            vh -= offsets.bottom;

            var vr = vx + vw,
                vb = vy + vh,
                xy = proposedXY || (!local ? this.getXY() : [this.getLeft(true), this.getTop(true)]),
                x = xy[0], y = xy[1],
                offset = this.getConstrainOffset(),
                w = this.dom.offsetWidth + offset, 
                h = this.dom.offsetHeight + offset;

            
            var moved = false;
			
			// if(rtl condition){
/* 
*
*	On hover over the element Checks the dom object classname with "x-tip", to change the direction of the
*	tooltip to RTL mode by reducing the offset width + hover icon(hand) width 
*
*/			
            var toolTipclassName = this.dom.className; 
			if( toolTipclassName == "x-tip"){
				x= x-w-13;
				moved = true;
				}
			// }
			
            if((x + w) > vr){
                x = vr - w;
                moved = true;
            }
            if((y + h) > vb){
                y = vb - h;
                moved = true;
            }
            
            if(x < vx){
                x = vx;
                moved = true;
            }
            if(y < vy){
                y = vy;
                moved = true;
            }
            return moved ? [x, y] : false;
        };
    }()
});

/**
 * Drag & Drop option disabled for RTL
 * 
 */
Ext.override(Ext.ux.Portlet, {
	draggable : false 
    
});
	
Ext.override(Ext.ux.form.ItemSelector,{
	
	iconRight : "left2.gif",//Configuration changed  here
	iconLeft : "right2.gif"//Configuration changed here
});





Ext.override(Ext.form.HtmlEditor, {
	
	/* Private Method:alignErrorIcon--to allign the error icon properly */
  alignErrorIcon: function()
  {
      try{
          this.errorIcon.alignTo(this.wrap, 'tr-tl', [2, 0]);
      }
      catch(err){}
  }
});
	
