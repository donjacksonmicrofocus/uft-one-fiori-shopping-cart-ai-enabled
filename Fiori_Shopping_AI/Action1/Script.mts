﻿'=================================================================================================================================================================================
'	Note that the demo application has the text "Available" on both the left frame, list of products, and in the middle, advertisement frame.
'		This is why we're using micFromLeft rather than miFromTop, because some categories will have the 2nd available product below the advertisement frame products
'=================================================================================================================================================================================
Dim Category, CategoryListHeader, rc											'Initialize the variables to be used to enable data driving

'================================================================================================
'This code will make it so that the script will be able to be run in both 15.0.1 and 15.0.2+ environment
If isempty(micAnyText) and not isempty(micNoText) Then
    micAnyText = micNoText    
End If
'================================================================================================

Category = DataTable.GlobalSheet.GetParameter("Categories")						'Set the value for the Category that will be clicked on
CategoryListHeader = "< " & Category											'Set the value for the Category header in the list of products
Browser("Browser").ClearCache													'Clear the browser cache, the application sometimes gets pushed changes that require a clear cache
Browser("Browser").Navigate ("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html")	'Navigate to the application
Browser("Browser").Maximize														'Maximize the browser or the objects won't be visible
AIUtil.SetContext Browser("Browser")											'Instruct the AI SDK to start working against the browser
AIUtil.FindTextBlock(Category).Click											'Click the value in the datasheet in the category menu, originally created with the Laptops category
'=================================================================================================================================================================================
'	Example of an AI sync point
'=================================================================================================================================================================================
rc = AIUtil.FindTextBlock("EUR", micFromTop, 5).Exist(20)							'Wait for the page to load to show th text EUR 5 times on the screen (so the left pane list of products has loaded)
AIUtil.FindTextBlock("Available", micFromLeft, 1).Click							'Click on the first available product 
AIUtil.FindTextBlock("Available", micFromLeft, 2).Click							'Click on the second available product
AIUtil("button", "Add to Cart").Click											'Click on the Add to Cart button.
AIUtil("shopping_cart").Click													'Click the shopping cart icon
AIUtil.FindTextBlock(CategoryListHeader).Click 50, 1							'Click on the text of the category header to allow the application to catch up, could replace with a .Highlight
AIUtil("pencil").Click															'Click the edit icon, shaped like a pencil
AIUtil.FindTextBlock(CategoryListHeader).Click 50, 1							'Click on the text of the category header to allow the application to catch up, could replace with a .Highlight
Browser("Browser").Maximize														'Maximize the browser or the objects won't be visible
AIUtil("close").Click															'Click the delete button for the first item in the cart, script assumes there is only one item in the cart
AIUtil("button", "Delete").Click												'Click the Delete button in the pop-up frame
AIUtil.FindTextBlock("Save Changes").Click										'Click the Save Changes in the cart slide out frame
AIUtil("left_triangle", micAnyText, micFromTop, 1).Click							'Click the arrow next to the category header to move back to the main categories page
AIUtil("button", "").Click														'Click the cart icon to collapse the shopping cart slide out frame.
Browser("Browser").Close														'Close the browser window

