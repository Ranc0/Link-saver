
		let myleads=[];
		const inputBtn=document.getElementById("input-btn");
		const selectallBtn=document.getElementById("selectall-btn");
		const tabBtn=document.getElementById("tab-btn");
		const inputEl=document.getElementById("input-el");
		const deleteSelectedBtn=document.getElementById("deleteSelected-btn");
		const copySelectedBtn=document.getElementById("copyselected-btn");
		const ulEl = document.getElementById("ul-el");


		const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));

		if (leadsFromLocalStorage)
		{
			myleads=leadsFromLocalStorage;
			render(myleads); 
		}

		let mp = new Map();
		checker(myleads);

	inputBtn.addEventListener("click",function()
	{
		
		let can = 1;
		let holder=''; 
		let t = 'some links already exist so they are not added';
		let s = inputEl.value;
		s+=' ';
		
		
		 for (let i = 0 ; i<s.length ; i++)
		  {
		  	
		  	if (s[i]!=' ') holder+=s[i];
			else if (s[i]==' ' && (mp[holder]!=1) && holder.length>0 ){myleads.push(holder);mp[holder]=1;holder='';}
			else if (s[i]==' ' && (mp[holder]==1 && holder.length>0)  ){holder='';t+=' ';}
		  }

		
		
		inputEl.value="";
		render(myleads);
		localStorage.clear();
		localStorage.setItem("myleads",JSON.stringify(myleads));

		if (t.length>46) {alert (t);}
		clearmp();
		checker(myleads);
	}
	);
	selectallBtn.addEventListener("click",function()
	{

		for (let i = 0 ; i<myleads.length ; i++)
		{

			let holder = document.getElementById(myleads[i]);

			 holder.checked=1;
		}

	}
	);
	deleteSelectedBtn.addEventListener("click",function()
	{
		for (let i = 0 ; i<myleads.length ; i++)
		{
			let holder = document.getElementById(myleads[i]);

			if (holder===null || holder.checked) myleads[i]=-1;
		}
		let newleads = [];
		for (let i = 0 ; i<myleads.length ; i++)
		{
			if (myleads[i]!=-1) newleads.push(myleads[i]);
		}
		myleads = newleads;
		localStorage.clear();
		localStorage.setItem("myleads",JSON.stringify(myleads));
		clearmp();
		checker(myleads);
		render(myleads);


	}
	);
	copySelectedBtn.addEventListener("click",function()
	{
		let str='';
		for (let i = 0 ; i<myleads.length ; i++)
		{
			let holder = document.getElementById(myleads[i]);

			if (holder!==null && holder.checked) {str+=myleads[i]+ ' ' ;}
		}
		navigator.clipboard.writeText(str)
         .then(() => alert("Copied"))
		//console.log(str);
		
	})


	tabBtn.addEventListener("click",function()

	{


		chrome.tabs.query({active :true ,currentWindow:true }, function(tabs)
		{
			let can = 1; 
		let s =tabs[0].url ;
		for (let i = 0 ; i<myleads.length ; i++)
		{
			if (myleads[i]==s) {can = 0 ; break;}
		}

		 if (can) myleads.push(s);
		  else {window.alert(" link already exists ");}

		localStorage.setItem("myleads",JSON.stringify(myleads));
		render(myleads);
		checker(myleads);
		}
		)
		
	}
	);
	
	function render(leads)
	{
	let listItem="";
		for (let i = 0  ; i <leads.length ; i++) {
			listItem+=
			 `<li> 
			<a target ='_blank' href='${leads[i]}' > ${leads[i]} </a> <input type="checkbox" , id = ${leads[i]}>
			</li>`;

		
		}
		ulEl.innerHTML=listItem;
		// console.log(listItem);
		}
		function checker (leads)
		{
			for (let i = 0 ; i<leads.length; i++)
			{
				if (mp[myleads]!=1) mp[myleads[i]]=1;
			}
		}
		function clearmp()
		{
			for (let i in mp)
				{mp[i]=0;}
		}
		
		
	
