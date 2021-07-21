import pandas as pd
import numpy as np

df = pd.read_csv("docs/data/HerdImmunity2.csv")
ranges = [str(col) + str((df[col].min(), df[col].max())) for col in df.columns]
print(ranges)
exists = df.loc[(df['natImmunity']== 0.1) & (df['vacImmunity']== 1.0)& (df['vaccinated']== 1.0) & (df['Rrange']== 0.0) & (df['Rnull']== 1.0)]
print(exists)

README = "This is a workbench to clean data when need easy access to the CSV's "

DF = pd.read_csv("API_NY.GDP.PCAP.CD_DS2_en_csv_v2_1678517.csv")
DF['Country'] = DF['Country Name'].astype(str)
years = [str(i) for i in range(1980, 2019)]
newIndexCountries = []
newIndexYears = []
for country in DF['Country']:
    for year in years:
        newIndexCountries.append(country)
        newIndexYears.append(year)

df2 = pd.DataFrame()
df2['Country'] = newIndexCountries
df2['Year'] = newIndexYears
values = []
for i in range(len(df2)):
    curCountry = df2.iloc[i]["Country"]
    curYear = df2.iloc[i]["Year"]
    row = DF.loc[DF['Country'] == curCountry]
    if len(row) != 0:
        value = row[curYear]
        values.append(value.values[0])
    else:
        values.append(None)
df2['GDPCapita'] = values

DF = pd.read_csv("Vaccines_Merged(3).csv")
DF = DF.drop("Unnamed: 0", axis=1)
capita = []
for i in range(len(DF)):
    row = DF.iloc[i]
    country = row['Country']
    year = str(row['Year']).strip()
    under5Val = df2.loc[(df2["Country"] == country) & (df2['Year'] == year)]
    if len(under5Val) != 0:
        value = under5Val['GDPCapita']
        capita.append(value.values[0])
    else:
        capita.append(None)

DF['GDPCapita'] = capita

#avgVaccines = []
#for i in range(len(DF)):
#    row = DF.iloc[i]
#    avg = round(np.nanmean(list(row[3: -1])), 2)
#    avgVaccines.append(avg)
#DF['AVGVaccinePercent'] = avgVaccines
DF.to_csv("Vaccines_Merged(4).csv", index=False)


print("DONE")