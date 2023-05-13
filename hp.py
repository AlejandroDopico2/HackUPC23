#!/usr/bin/env python
# coding: utf-8
import copy

# In[34]:


import pandas as pd 
import matplotlib.pyplot as plt
import numpy as np
import os
from datetime import datetime, timedelta



# # Nueva sección

# In[35]:


train_df = pd.read_csv('train.csv',header=0,names=['identifier','date','year_week','product_number','reporterhq_id','prod_category','specs','display_size','segment','sales_units','inventory_units'])
train_df.head()


# In[36]:


train_df.dtypes


# In[37]:


train_df.isna().sum()


# In[38]:


subset = train_df[["identifier", "reporterhq_id"]]
dup = np.sum(subset.duplicated())
print(f"Existen {dup} columnas duplicadas")


# In[39]:


sales_unit_na= train_df["sales_units"].isna().sum()/train_df.shape[0]
inventory_unit_na= train_df["inventory_units"].isna().sum()/train_df.shape[0]

print(f"Un {sales_unit_na*100}% de sales_unit son nulos y {inventory_unit_na*100}% de inventory null")


# In[40]:


non_na = train_df.dropna()
non_na.isna().sum()


# In[41]:


print(non_na.shape, train_df.shape)


# In[42]:


non_na.describe()


# In[43]:


non_na.shape


# In[44]:


test = non_na
test = test.groupby("identifier")[["identifier", "inventory_units"]].sum()
new_df = non_na.drop_duplicates(subset=['identifier'],keep = 'first')
test.drop("identifier", axis=1, inplace=True)
test.reset_index(inplace=True)

new_df = pd.merge(new_df, test, on = 'identifier', how = 'left')
new_df.loc[new_df['inventory_units_y'].notnull(), 'inventory_units'] = new_df['inventory_units_y']
new_df.drop(['inventory_units_y', 'inventory_units_x', 'reporterhq_id', 'year_week'], axis=1, inplace=True)
new_df.describe()


# In[45]:


new_df["date"] = pd.to_datetime(new_df["date"])
new_df


# In[46]:


gd = new_df.groupby('date').sum(numeric_only = True)
plt.plot(gd.index, gd.inventory_units)
plt.xticks(rotation = 45)
plt.xlabel('Date') 
plt.ylabel('Inventory Units')
plt.title('Inventory in time')
plt.show()


# In[47]:


plt.plot(gd.index, gd.sales_units)
plt.xticks(rotation = 45)
plt.xlabel('Date') 
plt.ylabel('Sales Units')
plt.title('Sales in time')
plt.show()


# In[50]:


for i,row in new_df[:-1].iterrows():
    date = row["date"]
    product_number = row["product_number"]
    row2 = new_df.iloc[i+1]
    if row2["product_number"] == product_number:
        diff = row2["date"] - date
        if diff.days > 7:
            p_num = row["product_number"]
            weeks_diff = int(diff.days / 7)
            if weeks_diff <= 3:
                incremento = (row2["sales_units"] -  row["sales_units"]) / (weeks_diff)
                current_date = date
                for k in range(1,weeks_diff):
                    new_row = copy.copy(row)
                    current_date += timedelta(days=7)
                    new_row["date"] = current_date
                    new_row["sales_units"] = row["sales_units"] + k * incremento
                    anho, semana, _ = current_date.isocalendar()
                    new_row["identifier"] = str(anho) + str('{:0>2d}'.format(semana)) + "-" + str(row["product_number"])
                    print(f"Adding {new_row['identifier']}")
                    new_df.loc[i+k-1] = new_row


# In[ ]:

print(new_df[new_df.product_number == 116466])


