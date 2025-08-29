export interface TopicContent {
  id: string;
  title: string;
  type: string;
  content: {
    explanation: string;
    codeExample?: string;
    practicalExercise?: string;
    keyPoints: string[];
    quiz?: {
      question: string;
      options: string[];
      correct: number;
    };
  };
}

export const topicData: { [key: string]: TopicContent } = {
  what_is_pandas: {
    id: 'what_is_pandas',
    title: 'What is Pandas',
    type: 'theory',
    content: {
      explanation: `Pandas is a powerful, open-source data analysis and manipulation library for Python. Built on top of NumPy, it provides high-performance, easy-to-use data structures and data analysis tools.

🎯 **What makes Pandas special?**

Pandas stands for "Panel Data" and was originally developed by Wes McKinney in 2008. It has become the cornerstone of data analysis in Python because it makes working with structured data intuitive and efficient.

**Key Capabilities:**
• Data Structures: Two primary data structures - Series (1D) and DataFrame (2D)
• Data Import/Export: Read from CSV, Excel, JSON, SQL databases, web APIs, and more
• Data Cleaning: Handle missing data, remove duplicates, transform data types
• Data Manipulation: Filter, sort, group, merge, and reshape data with ease
• Statistical Analysis: Built-in statistical functions and time series analysis
• Visualization: Basic plotting capabilities with matplotlib integration

**Why Pandas is Essential:**
Pandas bridges the gap between raw data and analysis. Before pandas, working with structured data in Python required writing lots of boilerplate code. Pandas provides intuitive, readable syntax that makes data analysis accessible to everyone.

**Industries Using Pandas:**
• Finance - Risk analysis, portfolio optimization, trading algorithms
• Healthcare - Patient data analysis, medical research, clinical trials
• Marketing - Customer segmentation, campaign analysis, A/B testing  
• Technology - Log analysis, user behavior tracking, system monitoring
• Research - Scientific data analysis, academic research, data journalism`,

      codeExample: `\`\`\`python
# Import pandas - the standard way
import pandas as pd
import numpy as np

# Create your first DataFrame
data = {
    'Product': ['Laptop', 'Phone', 'Tablet', 'Monitor'],
    'Price': [999.99, 699.99, 399.99, 299.99],
    'Category': ['Electronics', 'Electronics', 'Electronics', 'Electronics'],
    'In_Stock': [True, True, False, True],
    'Rating': [4.5, 4.2, 4.0, 4.8]
}

df = pd.DataFrame(data)
print("Your First DataFrame:")
print(df)
print(f"DataFrame Shape: {df.shape}")
print(f"Data Types:\\n{df.dtypes}")

# Create a Series (1D data structure)
prices = pd.Series([999.99, 699.99, 399.99, 299.99], 
                   name='Prices',
                   index=['Laptop', 'Phone', 'Tablet', 'Monitor'])
print(f"Prices Series:\\n{prices}")

# Quick DataFrame statistics
print(f"Quick Statistics:\\n{df.describe()}")
\`\`\``,

      practicalExercise: `🎯 **Your First Pandas Challenge:**

Create a DataFrame about your favorite movies:

1. Create a dictionary with these columns:
   - 'Title': Names of 5 movies you love
   - 'Year': Release years  
   - 'Genre': Movie genres
   - 'Rating': Your personal rating (1-10)
   - 'Watched': True/False if you've watched recently

2. Convert it to a DataFrame using pd.DataFrame()
3. Print the DataFrame
4. Print the shape and data types
5. Calculate the average rating using df['Rating'].mean()

**Bonus Challenge:**
Create a Series of movie directors and explore its properties!`,

      keyPoints: [
        'Pandas is built on NumPy, making it fast and efficient for numerical operations',
        'Two main data structures: Series (1D) and DataFrame (2D) handle most data scenarios',
        'Pandas excels at data import/export with support for 10+ file formats',
        'Built-in functions for data cleaning, transformation, and statistical analysis',
        'Essential tool in data science workflow - from raw data to insights',
        'Developed by Wes McKinney in 2008, now maintained by large open-source community',
        'Integrates seamlessly with matplotlib, scikit-learn, and other Python libraries'
      ],

      quiz: {
        question: "What are the two primary data structures in pandas?",
        options: [
          "List and Dictionary", 
          "Series and DataFrame", 
          "Array and Matrix", 
          "Table and Column"
        ],
        correct: 1
      }
    }
  },

  installation_setup: {
    id: 'installation_setup',
    title: 'Installation and Setup',
    type: 'practical',
    content: {
      explanation: `Getting pandas installed and configured properly is crucial for a smooth data analysis experience. Let's explore different installation methods and set up your environment.

🔧 **Installation Methods:**

**Method 1: pip (Python Package Installer)**
The most straightforward method for most users. pip comes with Python 3.4+ by default.

**Method 2: conda (Anaconda/Miniconda)** Recommended for data science work. Conda manages dependencies better and includes optimized numerical libraries.

**Method 3: Full Anaconda Distribution**
Complete data science environment with 250+ packages pre-installed.

🔍 **Verification Steps:**
After installation, always verify that pandas is working correctly and check the version.

🚀 **Development Environment Setup:**
For the best pandas experience, consider setting up:
• Jupyter Notebook/Lab: Interactive development environment
• IDE Configuration: VS Code, PyCharm, or Spyder with pandas support
• Virtual Environments: Isolate your pandas projects

📦 **Additional Packages:**
While pandas is powerful alone, these packages enhance your data analysis:
• NumPy: Numerical operations (automatically installed with pandas)
• Matplotlib: Data visualization  
• Seaborn: Statistical data visualization
• Openpyxl: Excel file support
• SQLAlchemy: Database connectivity`,

      codeExample: `**Installation Commands (run in terminal/command prompt):**

\`\`\`bash
# Method 1: Using pip
pip install pandas

# Install pandas with additional data science packages
pip install pandas numpy matplotlib seaborn jupyter openpyxl

# Method 2: Using conda (recommended for data science)
conda install pandas

# Install from conda-forge (often more up-to-date)
conda install -c conda-forge pandas

# Method 3: Create a new conda environment with pandas
conda create -n data_analysis python=3.9 pandas numpy matplotlib jupyter
conda activate data_analysis

# Upgrade existing pandas installation
pip install --upgrade pandas
# or
conda update pandas
\`\`\`

**Verification Code (run in Python):**

\`\`\`python
import pandas as pd
import numpy as np
import sys

print("🐍 Python Version:", sys.version)
print("🐼 Pandas Version:", pd.__version__)
print("🔢 NumPy Version:", np.__version__)

# Test basic functionality
test_data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(test_data)
print("\\n✅ Pandas is working correctly!")
print(df)

# Check available pandas functions
print(f"\\n📊 Available pandas functions: {len(dir(pd))} total")

# Display pandas configuration
print("\\n⚙️ Pandas Configuration:")
pd.show_versions(as_json=False)
\`\`\``,

      practicalExercise: `🛠️ **Installation Practice:**

**Step 1: Install pandas**
Choose your preferred method and install pandas

**Step 2: Verify Installation**
Run the verification code to check everything works

**Step 3: Set Up Your Environment**
1. Install Jupyter: \`pip install jupyter\`
2. Launch Jupyter: \`jupyter notebook\`
3. Create a new notebook called "Pandas_Practice"

**Step 4: Environment Test**
In your new notebook:
1. Import pandas and numpy
2. Create a small DataFrame with sample data
3. Perform a simple operation (like calculating mean)
4. Display the result

**Troubleshooting Common Issues:**
• Permission errors: Try \`pip install --user pandas\`
• Version conflicts: Use virtual environments
• ImportError: Restart your Python environment after installation`,

      keyPoints: [
        'pip install pandas is the quickest method for most users',
        'conda is recommended for data science due to better dependency management',
        'Always verify installation by importing pandas and checking version',
        'Jupyter Notebook provides excellent interactive environment for pandas',
        'Virtual environments prevent package conflicts in different projects',
        'Keep pandas updated with regular pip/conda upgrade commands',
        'Install additional packages (matplotlib, seaborn) for complete data analysis toolkit'
      ],

      quiz: {
        question: "Which installation method is recommended for data science projects?",
        options: [
          "pip install pandas",
          "conda install pandas", 
          "Download from website",
          "Build from source"
        ],
        correct: 1
      }
    }
  },

  importing_pandas: {
    id: 'importing_pandas',
    title: 'Importing Pandas',
    type: 'code',
    content: {
      explanation: `Once pandas is installed, you need to import it into your Python scripts. Following standard conventions makes your code readable and maintainable.

📚 **Standard Import Conventions:**
The pandas community has established universal conventions for importing pandas and related libraries. Following these conventions makes your code instantly recognizable to other data analysts and developers.

**Why 'pd' alias?**
• Shorter and faster to type
• Universal recognition in data science community
• Consistent with numpy ('np') and matplotlib ('plt') conventions
• Saves typing while maintaining code readability

🔧 **Import Best Practices:**
• Always import at the top of your script/notebook
• Group imports logically: standard library, third-party, local modules
• Use consistent aliases across all your projects
• Import specific functions when you only need a few operations

⚡ **Performance Considerations:**
• Importing entire pandas: import pandas as pd (most common)
• Importing specific functions: from pandas import DataFrame, Series
• The specific import method can be faster for large applications
• But general import (as pd) is more flexible and readable`,

      codeExample: `**Standard Pandas Imports:**

\`\`\`python
# The universal standard - use this in 99% of cases
import pandas as pd

# Common data science imports - the "holy trinity"
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Extended data science toolkit
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
\`\`\`

**Specific Function Imports:**

\`\`\`python
# Import specific pandas functions (less common but useful)
from pandas import DataFrame, Series, read_csv, read_excel
from pandas import concat, merge, pivot_table

# Create DataFrame without pd. prefix
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = DataFrame(data)  # Instead of pd.DataFrame(data)
\`\`\`

**Verification and Exploration:**

\`\`\`python
import pandas as pd
import numpy as np

# Check what you've imported
print("🐼 Pandas version:", pd.__version__)
print("🔢 NumPy version:", np.__version__)

# Explore pandas namespace
print(f"\\n📊 Total pandas attributes: {len(dir(pd))}")

# Key pandas components
print("\\n🔧 Key pandas components:")
main_components = ['DataFrame', 'Series', 'read_csv', 'read_excel', 
                   'concat', 'merge', 'pivot_table', 'crosstab']
for component in main_components:
    if hasattr(pd, component):
        print(f"  ✅ {component}")
\`\`\`

**Pandas Configuration:**

\`\`\`python
# View current pandas options
print("\\n⚙️ Important pandas options:")
print(f"Display max rows: {pd.get_option('display.max_rows')}")
print(f"Display max columns: {pd.get_option('display.max_columns')}")
print(f"Display width: {pd.get_option('display.width')}")

# Customize pandas display (optional)
pd.set_option('display.max_columns', 10)
pd.set_option('display.width', 1000)

# Reset to defaults if needed
# pd.reset_option('all')
\`\`\``,

      practicalExercise: `💻 **Import Practice Exercise:**

**Task 1: Standard Imports**
1. Create a new Python file or Jupyter cell
2. Import pandas with the standard alias
3. Import numpy and matplotlib with standard aliases
4. Print the version of each library

**Task 2: Create and Display Data**
1. Create a DataFrame with this data:
   - Names: ['Alice', 'Bob', 'Charlie']
   - Ages: [25, 30, 35]  
   - Cities: ['NYC', 'LA', 'Chicago']
2. Display the DataFrame
3. Show the data types using df.dtypes

**Task 3: Specific Imports**
1. Try importing only DataFrame and Series from pandas
2. Create the same data structure without using pd. prefix
3. Compare the two approaches

**Task 4: Explore Pandas**
1. Use dir(pd) to see all available pandas functions
2. Find and print 5 functions that start with 'read_'
3. Use help(pd.DataFrame) to see DataFrame documentation`,

      keyPoints: [
        "'import pandas as pd' is the universal standard - use it consistently",
        "Import numpy as 'np' and matplotlib.pyplot as 'plt' for complete data science setup",
        "Specific imports (from pandas import DataFrame) can be faster but less flexible",
        "Always import at the top of your script for better code organization",
        "Use pd.get_option() and pd.set_option() to customize pandas behavior",
        "dir(pd) shows all available pandas functions and attributes",
        "Following community conventions makes your code more maintainable and shareable"
      ],

      quiz: {
        question: "What is the standard alias used when importing pandas?",
        options: ["pandas", "pds", "pd", "pan"],
        correct: 2
      }
    }
  },

  intro_series: {
    id: 'intro_series',
    title: 'Introduction to Series',
    type: 'theory',
    content: {
      explanation: `A pandas Series is a one-dimensional labeled array that can hold any data type. Think of it as a column in a spreadsheet or a single column from a database table.

🎯 **What is a Series?**
A Series is like a supercharged Python list with extra features:
• Labeled indices: Each value has a label (like row numbers in Excel)
• Homogeneous data: All values are typically the same type  
• Vectorized operations: Perform operations on entire series at once
• Built-in methods: Tons of useful functions for data analysis

🏗️ **Series Structure:**
\`\`\`
Index    Values
-----    ------
  0   →   'Apple'
  1   →   'Banana'  
  2   →   'Orange'
  3   →   'Grape'
\`\`\`

📊 **Series vs Python List:**
• Python List: [10, 20, 30, 40]
• Pandas Series: Labeled, typed, with built-in analytics

🔍 **Key Components:**
1. **Values**: The actual data (numbers, strings, dates, etc.)
2. **Index**: Labels for each value (automatically generated or custom)
3. **Name**: Optional name for the Series
4. **Data Type**: The type of data stored (int64, float64, object, etc.)

⚡ **When to Use Series:**
• Representing a single variable (like all ages in a dataset)
• Time series data (stock prices over time)
• Any sequence of labeled data
• As building blocks for DataFrames`,

      codeExample: `**Creating Series - Multiple Methods:**

\`\`\`python
import pandas as pd
import numpy as np

# Method 1: From a Python list (most common)
fruits = pd.Series(['Apple', 'Banana', 'Orange', 'Grape'])
print("🍎 Fruits Series:")
print(fruits)
print(f"Type: {type(fruits)}\\n")

# Method 2: From a list with custom index
prices = pd.Series([1.50, 0.75, 2.00, 3.50], 
                   index=['Apple', 'Banana', 'Orange', 'Grape'],
                   name='Fruit_Prices')
print("💰 Fruit Prices:")
print(prices)
print()

# Method 3: From a dictionary (keys become index)
student_grades = pd.Series({
    'Alice': 95,
    'Bob': 87,
    'Charlie': 92,
    'Diana': 89
})
print("📊 Student Grades:")
print(student_grades)
print()

# Method 4: From numpy array
np_array = np.array([10, 20, 30, 40, 50])
numbers = pd.Series(np_array, name='Numbers')
print("🔢 Numbers Series:")
print(numbers)
print()
\`\`\`

**Series Properties and Attributes:**

\`\`\`python
print("🔍 Series Properties:")
print(f"Values: {prices.values}")
print(f"Index: {prices.index.tolist()}")
print(f"Name: {prices.name}")
print(f"Data Type: {prices.dtype}")
print(f"Shape: {prices.shape}")
print(f"Size: {prices.size}")
print()
\`\`\`

**Basic Series Operations:**

\`\`\`python
print("📈 Basic Operations:")
print(f"Maximum price: \$\${prices.max()}")
print(f"Minimum price: \$\${prices.min()}")
print(f"Average price: \$\${prices.mean()}")
print(f"Sum of all prices: \$\${prices.sum()}")
print()

# Accessing elements
print("🎯 Accessing Elements:")
print(f"Apple price: \$\${prices['Apple']}")
print(f"First fruit price: \$\${prices.iloc[0]}")  # by position
print(f"Last fruit price: \$\${prices.iloc[-1]}")  # last element
print()

# Boolean indexing
expensive_fruits = prices[prices > 2.0]
print("💸 Expensive fruits (>\\$2.00):")
print(expensive_fruits)
\`\`\``,

      practicalExercise: `🎯 **Series Creation Challenge:**

**Exercise 1: Personal Data Series**
Create three Series about yourself:
1. **Hobbies**: List your top 5 hobbies with custom indices (hobby1, hobby2, etc.)
2. **Daily Hours**: Hours spent on different activities (sleep, work, leisure, etc.)
3. **Favorite Numbers**: Your lucky numbers with their meanings as index

**Exercise 2: Data Analysis**
Using the daily hours Series:
1. Find the activity you spend most time on
2. Calculate total hours (should be 24!)
3. Find activities where you spend more than 2 hours
4. Create a new Series with just work-related activities

**Exercise 3: Series from Dictionary**
Create a Series representing a simple inventory:
- Items: ['Laptop', 'Mouse', 'Keyboard', 'Monitor']  
- Quantities: [5, 25, 15, 8]
- Calculate total items and find items with low stock (<10)

**Bonus Challenge:**
Create a time series with dates as index and random temperatures as values for one week!`,

      keyPoints: [
        'Series is a 1D labeled array - like a single column with row labels',
        'Can be created from lists, dictionaries, numpy arrays, or scalar values',
        'Index provides meaningful labels for each value (auto-generated or custom)',
        'Supports vectorized operations - apply functions to entire series at once',
        'Access elements by label (series["label"]) or position (series.iloc[0])',
        'Built-in statistical methods: mean(), sum(), max(), min(), describe()',
        'Series are the building blocks of DataFrames (DataFrame = multiple Series)'
      ],

      quiz: {
        question: "What is the main difference between a pandas Series and a Python list?",
        options: [
          "Series can only hold numbers",
          "Series has labeled indices and built-in methods", 
          "Series are faster to create",
          "Series cannot be modified"
        ],
        correct: 1
      }
    }
  },

  intro_dataframe: {
    id: 'intro_dataframe',
    title: 'Introduction to DataFrame',
    type: 'theory',
    content: {
      explanation: `A DataFrame is pandas' primary data structure - a 2-dimensional labeled data structure with columns of potentially different types. Think of it as a spreadsheet or SQL table in Python.

🎯 **What is a DataFrame?**
A DataFrame is like a collection of Series that share the same index:
• **2D Structure**: Rows and columns like a table
• **Labeled Axes**: Both row (index) and column labels
• **Mixed Data Types**: Different columns can hold different data types
• **Size Mutable**: Add/remove rows and columns dynamically
• **Powerful Operations**: Built-in functions for data manipulation and analysis

🏗️ **DataFrame Structure:**
\`\`\`
         Name    Age    City       Salary
Index    
  0   →  Alice   25   New York    70000
  1   →  Bob     30   London      80000  
  2   →  Charlie 35   Tokyo       90000
\`\`\`

📊 **Key Components:**
1. **Index**: Row labels (0, 1, 2... or custom labels)
2. **Columns**: Column names/labels  
3. **Values**: The actual data in a 2D numpy array
4. **Data Type**: Each column has its own data type

⚡ **DataFrame vs Other Structures:**
• **Excel Spreadsheet**: Similar concept but DataFrame is programmable
• **SQL Table**: Same tabular structure with more powerful operations
• **R data.frame**: Pandas DataFrame inspired by R's data.frame
• **Dictionary of Lists**: DataFrame provides structure and methods

🔍 **Common Use Cases:**
• Storing and analyzing business data (sales, customers, products)
• Scientific data analysis (experiments, measurements, observations)  
• Financial data (stock prices, trading records, portfolios)
• Web analytics (user behavior, page views, conversions)
• Any structured data that needs analysis and manipulation`,

      codeExample: `**Creating DataFrames - Multiple Methods:**

\`\`\`python
import pandas as pd
import numpy as np

# Method 1: From a dictionary (most common)
employee_data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Department': ['Engineering', 'Marketing', 'Sales', 'HR'],
    'Salary': [70000, 65000, 80000, 60000],
    'Start_Date': ['2020-01-15', '2019-03-22', '2018-07-08', '2021-02-01']
}

df = pd.DataFrame(employee_data)
print("👥 Employee DataFrame:")
print(df)
print(f"Shape: {df.shape} (rows, columns)\\n")

# Method 2: From list of dictionaries
sales_data = [
    {'Product': 'Laptop', 'Price': 999.99, 'Category': 'Electronics'},
    {'Product': 'Phone', 'Price': 699.99, 'Category': 'Electronics'},
    {'Product': 'Desk', 'Price': 299.99, 'Category': 'Furniture'}
]

sales_df = pd.DataFrame(sales_data)
print("🛒 Sales DataFrame:")
print(sales_df)
print()

# Method 3: From numpy array with custom index and columns
np_data = np.random.randint(0, 100, size=(4, 3))
grades_df = pd.DataFrame(np_data, 
                        columns=['Math', 'Science', 'English'],
                        index=['Alice', 'Bob', 'Charlie', 'Diana'])
print("📚 Student Grades DataFrame:")
print(grades_df)
print()
\`\`\`

**DataFrame Properties and Info:**

\`\`\`python
print("🔍 DataFrame Properties:")
print(f"Shape: {df.shape}")
print(f"Size (total elements): {df.size}")
print(f"Number of dimensions: {df.ndim}")
print(f"Column names: {df.columns.tolist()}")
print(f"Index: {df.index.tolist()}")
print(f"Data types:\\n{df.dtypes}")
print()

# Detailed information about the DataFrame
print("📊 DataFrame Info:")
df.info()
print()
\`\`\`

**Basic DataFrame Operations:**

\`\`\`python
print("🎯 Basic DataFrame Operations:")

# Head and tail
print("First 2 rows:")
print(df.head(2))
print()

print("Last 2 rows:")
print(df.tail(2))
print()

# Statistical summary
print("📈 Statistical Summary:")
print(df.describe())
print()

# Access specific columns
print("💰 Just the salaries:")
print(df['Salary'])
print()

# Access multiple columns
print("👤 Names and Ages:")
print(df[['Name', 'Age']])
print()

# Basic filtering
high_earners = df[df['Salary'] > 65000]
print("💸 High earners (>65k):")
print(high_earners)
\`\`\``,

      practicalExercise: `🎯 **DataFrame Creation Challenge:**

**Exercise 1: Personal Library**
Create a DataFrame with your favorite books:
- Columns: 'Title', 'Author', 'Year', 'Genre', 'Rating' (1-5), 'Pages'
- Add at least 5 books
- Display the DataFrame and its basic info

**Exercise 2: DataFrame Analysis**
Using your library DataFrame:
1. Find books published after 2010
2. Calculate the average rating
3. Find the longest book (most pages)
4. Group books by genre and count them
5. Create a new column 'Age' (current year - publication year)

**Exercise 3: Multiple Creation Methods**
Create the same student data using three different methods:
1. From a dictionary
2. From a list of dictionaries  
3. From separate lists for each column

Data to use:
- Students: ['John', 'Sarah', 'Mike', 'Emma']
- Subjects: ['Math', 'Science', 'English', 'History']  
- Grades: [85, 92, 78, 88]

**Exercise 4: Real-world Dataset**
Create a DataFrame representing a simple e-commerce order:
- Order_ID, Customer_Name, Product, Quantity, Unit_Price, Total_Price
- Add 6-8 sample orders
- Calculate summary statistics
- Find the most expensive order`,

      keyPoints: [
        'DataFrame is a 2D labeled data structure - like a spreadsheet in Python',
        'Can be created from dictionaries, lists, numpy arrays, or other DataFrames',
        'Each column is essentially a Series with a shared index',
        'Supports mixed data types - numbers, strings, dates in different columns',
        'Access columns with df["column_name"] or df.column_name syntax',
        'Use .head(), .tail(), .info(), and .describe() to explore DataFrames',
        'DataFrame is the most important pandas data structure for data analysis'
      ],

      quiz: {
        question: "How many dimensions does a pandas DataFrame have?",
        options: ["1 dimension", "2 dimensions", "3 dimensions", "Variable dimensions"],
        correct: 1
      }
    }
  }
};