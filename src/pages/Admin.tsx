import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Settings, FileText, Database, ArrowLeft, Bot, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import DocumentAnalysis from "@/components/DocumentAnalysis";
import { KnowledgeManager } from "@/components/KnowledgeManager";
import { ERPManager } from "@/components/ERPManager";
import { ERPApiTester } from "@/components/ERPApiTester";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PromptEditor from "../components/PromptEditor";

interface AdminProps {
  hideNavigation?: boolean;
}

const Admin = ({ hideNavigation = false }: AdminProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfUpload, setShowPdfUpload] = useState(false);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [showApiTester, setShowApiTester] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBackToWorkbench = () => {
    navigate('/workbench');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              {!hideNavigation && (
                <Button
                  variant="ghost"
                  onClick={handleBackToWorkbench}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Chat
                </Button>
              )}
              <div className="flex items-center gap-3">
                <Bot className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">Propertius Admin</h1>
                  <p className="text-gray-300">Professional Property Management Configuration</p>
                </div>
              </div>
            </div>
            {!hideNavigation && (
              <div className="flex items-center gap-4">
                {/* User info */}
                {user && (
                  <div className="text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white font-medium">{user.email}</span>
                    </span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* AI Prompt Management - Featured */}
        <div className="mb-8">
          <Card className="border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gray-800 text-white rounded-t-lg p-8">
              <CardTitle className="flex items-center text-2xl">
                <Settings className="mr-4 h-8 w-8" />
                AI Prompt Management
              </CardTitle>
              <p className="text-gray-300 mt-2 text-lg">
                Primary configuration tool for evaluating AI performance
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-600 mb-6 text-lg">
                Create, edit, and evaluate different versions of the AI system prompt. This is the most important evaluation feature for testing different AI configurations and measuring performance improvements.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 py-4 text-lg text-white"
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Open Prompt Manager
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>System Prompt Version Manager</DialogTitle>
                    <DialogDescription>
                      Create, edit, and evaluate different versions of the AI system prompt. This is a key evaluation feature for testing different AI configurations.
                    </DialogDescription>
                  </DialogHeader>
                  <PromptEditor />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>


        {/* Secondary Tools */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* AI Prompt Management - Moved to featured section above */}

          {/* Internal Knowledge Upload - Hidden for competitive_bidding workspace */}
          {currentWorkspace !== 'competitive_bidding' && (
          <Card className="border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gray-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <FileText className="mr-3 h-6 w-6" />
                {currentWorkspace === 'purchaser' ? 'Procurement Internal Knowledge' : 'Invoicing Internal Knowledge'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Upload markdown and text documents containing internal {currentWorkspace === 'purchaser' ? 'procurement policies, procedures, and purchasing guidelines' : 'invoicing policies, billing procedures, and financial workflows'} for AI analysis.
              </p>
              <Dialog open={showPdfUpload} onOpenChange={setShowPdfUpload}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Knowledge Documents
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{currentWorkspace === 'purchaser' ? 'Procurement Internal Knowledge' : 'Invoicing Internal Knowledge'} Management</DialogTitle>
                    <DialogDescription>
                      Upload and manage markdown and text documents for your internal knowledge base.
                    </DialogDescription>
                  </DialogHeader>
                  <KnowledgeManager />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          )}

          {/* ERP/P2P Integration Simulation - Hidden for competitive_bidding workspace */}
          {currentWorkspace !== 'competitive_bidding' && (
          <Card className="border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gray-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Database className="mr-3 h-6 w-6" />
                {currentWorkspace === 'purchaser' ? 'Purchase Order Integration' : 'Sales Invoice Integration'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Upload and manage your structured Excel file to simulate {currentWorkspace === 'purchaser' ? 'purchase order' : 'sales invoice'} ERP integration.
              </p>
              <Dialog open={showExcelUpload} onOpenChange={setShowExcelUpload}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Manage ERP Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{currentWorkspace === 'purchaser' ? 'Purchase Order' : 'Sales Invoice'} Integration Management</DialogTitle>
                    <DialogDescription>
                      Upload and manage your structured Excel file to simulate ERP integration.
                    </DialogDescription>
                  </DialogHeader>
                  <ERPManager />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          )}

          {/* ERP API Testing - Hidden for competitive_bidding workspace */}
          {currentWorkspace !== 'competitive_bidding' && (
          <Card className="border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gray-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Database className="mr-3 h-6 w-6" />
                {currentWorkspace === 'purchaser' ? 'Purchase Order API Tester' : 'Sales Invoice API Tester'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Test the internal ERP API with search functionality. Search by {currentWorkspace === 'purchaser' ? 'supplier, product, date range, or buyer name' : 'customer, invoice amount, date range, or invoice status'}.
              </p>
              <Dialog open={showApiTester} onOpenChange={setShowApiTester}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Test ERP API
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[1000px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{currentWorkspace === 'purchaser' ? 'Purchase Order' : 'Sales Invoice'} API Testing Interface</DialogTitle>
                    <DialogDescription>
                      Test the ERP search API with different criteria and verify functionality.
                    </DialogDescription>
                  </DialogHeader>
                  <ERPApiTester />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          )}

          {/* Issue Report */}
          <Card className="border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6" />
                Issue Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                View and manage negative feedback issues from user interactions. Track resolution status.
              </p>
              <Link to="/issues">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Issues
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Admin;