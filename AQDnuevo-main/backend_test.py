import requests
import sys
from datetime import datetime
import json

class TaxAppAPITester:
    def __init__(self, base_url="https://edevtax.preview.emergentagent.com"):
        self.base_url = base_url
        self.session_id = None
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Error response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        return success

    def test_create_user_session(self):
        """Test creating a user session"""
        success, response = self.run_test(
            "Create User Session",
            "POST",
            "api/user-session",
            200,
            data={
                "birth_year": 1990,
                "consent_given": True
            }
        )
        if success and 'id' in response:
            self.session_id = response['id']
            print(f"Session ID created: {self.session_id}")
            return True
        return False

    def test_update_user_session(self):
        """Test updating user session with answers"""
        if not self.session_id:
            print("❌ No session ID available for update test")
            return False
            
        success, response = self.run_test(
            "Update User Session",
            "PUT",
            f"api/user-session/{self.session_id}",
            200,
            data={
                "answers": {
                    "declaration_type": "individual",
                    "q1": "yes",
                    "q2": "no"
                },
                "flow_path": "timeResident",
                "completed": False
            }
        )
        return success

    def test_get_user_session(self):
        """Test retrieving user session"""
        if not self.session_id:
            print("❌ No session ID available for get test")
            return False
            
        success, response = self.run_test(
            "Get User Session",
            "GET",
            f"api/user-session/{self.session_id}",
            200
        )
        return success

    def test_analytics_endpoint(self):
        """Test analytics endpoint"""
        success, response = self.run_test(
            "Analytics Endpoint",
            "GET",
            "api/analytics/sessions",
            200
        )
        return success

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating status check
        success1, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            data={"client_name": "test_client"}
        )
        
        # Test getting status checks
        success2, response = self.run_test(
            "Get Status Checks",
            "GET",
            "api/status",
            200
        )
        
        return success1 and success2

def main():
    print("🚀 Starting Tax Declaration App API Tests")
    print("=" * 50)
    
    # Setup
    tester = TaxAppAPITester()
    
    # Run tests in order
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Status Endpoints", tester.test_status_endpoints),
        ("Create User Session", tester.test_create_user_session),
        ("Update User Session", tester.test_update_user_session),
        ("Get User Session", tester.test_get_user_session),
        ("Analytics Endpoint", tester.test_analytics_endpoint),
    ]
    
    for test_name, test_func in tests:
        print(f"\n📋 Running {test_name} test...")
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend API tests passed!")
        return 0
    else:
        print("⚠️  Some backend API tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())