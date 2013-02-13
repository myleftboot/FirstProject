// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

function isAndroid() {
	return (Ti.Platform.name == 'android');
}

function setupSettings() {
	
	var view = Ti.UI.createView({});
	
	var tableView = Ti.UI.createTableView({
			style:										Ti.UI.iPhone.TableViewStyle.GROUPED,
			scrollable:									true,
	});
	
	var firstSection = Ti.UI.createTableViewSection({ headerTitle: 'First',
													  footerTitle: 'Lots of contextual information'});
													
	var firstRow = Ti.UI.createTableViewRow({title: 'A setting',
											 hasChild: true});
	
	var secondRow = Ti.UI.createTableViewRow({height: 50});
	
	var theTitle = Ti.UI.createLabel({
        text:'The title',
        font:{fontSize:'16',fontWeight:'bold'},
        minimumFontSize:'12',
        textAlign:'left',
        top:'2',
        left:'10',
        height:'20'
     });
     
     secondRow.add(theTitle);

var theSnippet =  Titanium.UI.createLabel({
        text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
        font:{fontSize:'11',fontWeight:'normal'},
            textAlign:'left',
        color:'#666',
        bottom:'0',
        left:'10',
        height:'26'
     });

     secondRow.add(theSnippet);
     
	firstSection.add(firstRow);
	firstSection.add(secondRow);
	tableView.setData([firstSection]);
	view.add(tableView);
	return view;
}


function addMenu(win) {
	
	if (isAndroid()) {
	var activity = win.activity;

	activity.onCreateOptionsMenu = function(e){

 	var firstItem = e.menu.add({ title: 'First Item' });
	firstItem.addEventListener("click", function(e) {Ti.API.debug('First Item'); });
	
 	var secondItem = e.menu.add({ title: 'Second Item'});
	secondItem.addEventListener("click", function(e) {Ti.API.warn('Second Item'); });
	
	var thirdItem = e.menu.add({ title: 'Third Item'});
	thirdItem.addEventListener("click", function(e) {alert('Third Item'); });
	}
};
}

function rightButton(win) {
    if (!isAndroid()) {

      var right = Ti.UI.createButton({
         systemButton:Ti.UI.iPhone.SystemButton.INFO_LIGHT
      });
      right.addEventListener('click',function()
      {
         alert('button clicked!');
      });
      win.setRightNavButton(right); 
   }
}


// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);
addMenu(win1);
rightButton(win1);
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var view = Ti.UI.createView({
	top:20,
	bottom:'50%',
	left:20,
	right:'50%',
	backgroundColor:'red'
});

win2.add(view);

var button1 = Titanium.UI.createButton({
	color:'#000',
	title:'Button in View',
	textAlign:'center',
	top:10,
	left:10
});

button1.addEventListener('click', function(e) {alert('You clicked me!')});

view.add(button1);
win2.add(label2);

var win3 = Ti.UI.createWindow({
	backgroundColor:'black'
});

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Vertical Stack',
    window:win3
});

var winSettings = Ti.UI.createWindow({
});

var tabSettings = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Settings',
    window:winSettings
});

winSettings.add(setupSettings());

var view = Ti.UI.createView({layout:'vertical'});
var textField = Ti.UI.createTextField({backgroundColor:'white',
                                       hintText:'Here is a hint.',
                                       height:40,
                                       top:50,
                                       width:200});
view.add(textField);

win3.add(view);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tabSettings);


// open tab group
tabGroup.open();
