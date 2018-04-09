Welcome to Dejero Hub.
This Google Extension is going to make your life easier and works across the company. 

How to setup:
1. Open Google Chrome.
2. Type chrome://extensions on search bar.
3. Checkmark the box for 'Developer mode'.
4. Click 'Load unpacked extension...'.
5. Browse this folder (Dejero Hub).
6. Click 'OK'.
7. Dejero Hub extension is unpacked and ready to use, you could see its icon on the right of the search bar.

How to add your button:
1. Login to NetSuite.
2. Document -> File -> File Cabinet.
3. Go to folder- Dejero_Hub -> DH_source.
4. Click 'Add file'.
5. Browse your file and click 'OK'.

Making changes in the button file to make it accessible (extremely important step):
1. Click edit beside your button file name.
2. 'File Name':
  a. Starts with Group name, example, if you want to add file in 'netsuite' section of the extension then file name should be 'netsuite_filename.js'.
  b. You can also make your own group by making the name which does not exist, example, 'xyz_filename.js'.
  c. File Name should be in all lower case.
  d. Group name and button name should be less than 20 characters, max example, 'qwertyuiopasdfghjklz_qwertyuiopasdfghjklz.js'.
3. 'Description':
  a. Type a RegEx URL, example, 'https://system.sandbox.netsuite.com/*'.
  b. Your button will only be accessible only for this URL.
  c. You can add more than one URL separated by a comma (,) with no space, example, 'https://system.sandbox.netsuite.com/*,https://system.na1.netsuite.com/*'.
4. Check the box for 'Available Without Login'.
5. Click 'Save'.


NOTE: Quotes used in the examples is just for representation, not to be used in real.
